import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth/session";
import { readAuthStore } from "@/lib/auth/storage";
import { sanitizeUser } from "@/lib/auth/user";

export async function GET() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const store = await readAuthStore();
  const user = store.users.find((record) => record.id === session.sub);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: sanitizeUser(user) });
}