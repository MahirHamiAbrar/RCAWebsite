import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Query } from "@/lib/models/Query";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, series, roll, comments } = await req.json();

    // Basic validation
    if (!name?.trim() || !series?.trim() || !roll?.trim() || !comments?.trim()) {
      console.log("⚠ Incomplete form submission");
      return NextResponse.redirect(new URL("/query", req.url));
    }

    // Save to MongoDB
    const newQuery = new Query({ name, series, roll, comments });
    await newQuery.save();
    console.log("📩 Query saved:", newQuery);

    // Redirect to confirmation page
    return NextResponse.redirect(new URL("/confirmation", req.url));
  } catch (error) {
    console.error("🔥 Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
