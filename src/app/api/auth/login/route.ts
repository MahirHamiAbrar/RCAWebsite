import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { setAuthCookie, signSession } from "@/lib/auth/session";
import { sanitizeUser } from "@/lib/auth/user";
import { LoginPayload } from "@/types/auth";
import { normalizePhone } from "@/lib/auth/validation";
import { getUserByEmail, getUserByPhone } from "@/lib/auth/appwrite";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LoginPayload;
    const identifier = payload.identifier?.trim();
    const password = payload.password;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email/phone and password are required." },
        { status: 400 }
      );
    }

    const normalized = normalizePhone(identifier);
    const email = identifier.toLowerCase();

    const userByEmail = await getUserByEmail(email);
    const user = userByEmail || (await getUserByPhone(normalized));

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    if (user.status === "pending") {
      return NextResponse.json({ error: "Your account is awaiting approval by an admin." }, { status: 403 });
    }
    if (user.status === "rejected") {
      return NextResponse.json({ error: "Your account has been rejected." }, { status: 403 });
    }

    const token = await signSession({
      sub: user.id,
      name: user.fullName,
      email: user.email, role: user.role, status: user.status,
    });
    await setAuthCookie(token);

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}