import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth/session";
import { readAuthStore, writeAuthStore } from "@/lib/auth/storage";
import { mirrorUserToSupabase } from "@/lib/auth/supabase";
import { sanitizeUser } from "@/lib/auth/user";
import { MembershipType, RegisterPayload, SocialLink } from "@/types/auth";
import {
  normalizePhone,
  passwordStrength,
  validateMembershipSpecificFields,
} from "@/lib/auth/validation";

interface ProfileUpdatePayload {
  fullName: string;
  email: string;
  series: number;
  department: string;
  phoneNumber: string;
  bloodGroup?: string;
  membershipType: MembershipType;
  profilePictureUrl?: string;
  socialLinks: SocialLink[];
  rollNumber?: string;
  yearOfGraduation?: number;
  currentlyWorkingAt?: string;
  designation?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export async function GET() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readAuthStore();
  const user = store.users.find((item) => item.id === session.sub);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: sanitizeUser(user) });
}

export async function PATCH(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as ProfileUpdatePayload;
  const errors: string[] = [];

  if (!payload.fullName?.trim()) errors.push("Full name is required.");
  if (!payload.email?.trim()) errors.push("Email is required.");
  if (!Number.isFinite(Number(payload.series))) errors.push("Series is required.");
  if (!payload.department?.trim()) errors.push("Department is required.");

  const normalizedPhone = normalizePhone(payload.phoneNumber || "");
  if (!/^(?:\+8801|8801|01)[3-9]\d{8}$/.test(normalizedPhone)) {
    errors.push("Phone number must be a valid Bangladeshi number.");
  }

  validateMembershipSpecificFields(
    payload.membershipType,
    payload as Partial<RegisterPayload>,
    errors
  );

  if (payload.newPassword) {
    if (payload.newPassword.length < 8) {
      errors.push("New password must be at least 8 characters.");
    }
    if (passwordStrength(payload.newPassword) < 3) {
      errors.push("New password is too weak.");
    }
    if (payload.newPassword !== payload.confirmNewPassword) {
      errors.push("New password and confirm password do not match.");
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const store = await readAuthStore();
  const currentUserIndex = store.users.findIndex((item) => item.id === session.sub);
  if (currentUserIndex === -1) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = payload.email.trim().toLowerCase();
  const duplicate = store.users.find(
    (item) =>
      item.id !== session.sub && (item.email === email || item.phoneNumber === normalizedPhone)
  );

  if (duplicate) {
    return NextResponse.json(
      { error: "Another account already uses this email or phone number." },
      { status: 409 }
    );
  }

  const current = store.users[currentUserIndex];
  const nextPasswordHash = payload.newPassword
    ? await bcrypt.hash(payload.newPassword, 12)
    : current.passwordHash;

  const updated = {
    ...current,
    fullName: payload.fullName.trim(),
    email,
    series: Number(payload.series),
    department: payload.department,
    phoneNumber: normalizedPhone,
    bloodGroup: payload.bloodGroup?.trim() || undefined,
    membershipType: payload.membershipType,
    profilePictureUrl: payload.profilePictureUrl?.trim() || undefined,
    socialLinks: (payload.socialLinks || []).filter((item) => item.url?.trim()),
    rollNumber:
      payload.membershipType === "alumni"
        ? undefined
        : payload.rollNumber?.trim() || undefined,
    yearOfGraduation:
      payload.membershipType === "alumni"
        ? Number(payload.yearOfGraduation)
        : undefined,
    currentlyWorkingAt:
      payload.membershipType === "alumni"
        ? payload.currentlyWorkingAt?.trim() || undefined
        : undefined,
    designation:
      payload.membershipType === "alumni"
        ? payload.designation?.trim() || undefined
        : undefined,
    passwordHash: nextPasswordHash,
    updatedAt: new Date().toISOString(),
  };

  store.users[currentUserIndex] = updated;
  await writeAuthStore(store);
  await mirrorUserToSupabase(updated);

  return NextResponse.json({ user: sanitizeUser(updated) });
}