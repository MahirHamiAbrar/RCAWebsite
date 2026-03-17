import { randomUUID } from "node:crypto";
import { AuthUserRecord, PublicAuthUser, RegisterPayload } from "@/types/auth";

export function createUserRecord(
  payload: RegisterPayload,
  passwordHash: string,
  normalizedPhone: string
): AuthUserRecord {
  const now = new Date().toISOString();
  const membershipType = payload.membershipType;

  return {
    id: randomUUID(),
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    series: Number(payload.series),
    department: payload.department,
    phoneNumber: normalizedPhone,
    bloodGroup: payload.bloodGroup?.trim() || undefined,
    membershipType,
    profilePictureUrl: payload.profilePictureUrl?.trim() || undefined,
    socialLinks: payload.socialLinks?.filter((item) => item.url?.trim()) || [],
    rollNumber:
      membershipType === "alumni" ? undefined : payload.rollNumber?.trim() || undefined,
    yearOfGraduation:
      membershipType === "alumni"
        ? Number(payload.yearOfGraduation)
        : undefined,
    currentlyWorkingAt:
      membershipType === "alumni"
        ? payload.currentlyWorkingAt?.trim() || undefined
        : undefined,
    designation:
      membershipType === "alumni"
        ? payload.designation?.trim() || undefined
        : undefined,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };
}

export function sanitizeUser(user: AuthUserRecord): PublicAuthUser {
  const { passwordHash, ...rest } = user;
  return rest;
}