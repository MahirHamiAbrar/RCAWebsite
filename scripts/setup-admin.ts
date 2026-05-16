import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { upsertUser, getUserByEmail } from "../src/lib/auth/appwrite";
import { AuthUserRecord } from "../src/types/auth";
import { randomUUID } from "node:crypto";

async function setupAdmin() {
  const configPath = path.join(process.cwd(), "data", "admin-config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  
  const { email, password } = config;
  
  console.log(`Setting up default admin user: ${email}...`);
  
  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      console.log("Admin user already exists in Appwrite db. Updating role and status just in case...");
      existing.role = "admin";
      existing.status = "approved";
      await upsertUser(existing);
      console.log("Admin user updated.");
      return;
    }
    
    console.log("Creating new admin user...");
    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();
    
    const adminUser: AuthUserRecord = {
      id: randomUUID(),
      fullName: "RCA Admin",
      email: email,
      series: 0,
      department: "CSE",
      phoneNumber: "01700000000",
      membershipType: "committee",
      socialLinks: [],
      status: "approved",
      role: "admin",
      passwordHash,
      createdAt: now,
      updatedAt: now,
    };
    
    await upsertUser(adminUser);
    console.log("Admin user successfully created.");
  } catch (error) {
    console.error("Failed to setup admin:", error);
  }
}

setupAdmin();