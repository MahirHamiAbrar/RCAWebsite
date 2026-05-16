import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createUserRecord, sanitizeUser } from "@/lib/auth/user";
import { setAuthCookie, signSession } from "@/lib/auth/session";
import { upsertUser, getUserByEmail, getUserByPhone } from "@/lib/auth/appwrite";
import { RegisterPayload } from "@/types/auth";
import { validateRegisterPayload } from "@/lib/auth/validation";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RegisterPayload;
    const validation = validateRegisterPayload(payload);

    if (!validation.isValid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const email = payload.email.trim().toLowerCase();
    const emailExists = await getUserByEmail(email);
    const phoneExists = await getUserByPhone(validation.normalizedPhone);

    if (emailExists || phoneExists) {
      return NextResponse.json(
        { error: "Email or phone number is already registered." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user = createUserRecord(payload, passwordHash, validation.normalizedPhone);

    await upsertUser(user);

    // We do NOT log them in automatically since they need admin approval first
    // They will be redirected to a successful registration page where we tell them to wait

    return NextResponse.json({ user: sanitizeUser(user) }, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}