import { NextResponse } from "next/server";
import { verifyDatabaseConnection } from "@/lib/auth/appwrite";

export async function GET() {
  try {
    await verifyDatabaseConnection();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Appwrite health check failed:", error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Appwrite connection failed. Please ensure Appwrite is configured correctly." 
      },
      { status: 503 }
    );
  }
}
