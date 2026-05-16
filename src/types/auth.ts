import { JWTPayload } from "jose";

export type MembershipType = "regular" | "committee" | "alumni";

export interface SocialLink {
  platform: string;
  url: string;
}

export type UserStatus = "pending" | "approved" | "rejected";
export type UserRole = "user" | "admin";

export interface AuthUserRecord {
  id: string;
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
  status: UserStatus;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export type PublicAuthUser = Omit<AuthUserRecord, "passwordHash">;

export interface SessionPayload extends JWTPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  series: number;
  department: string;
  phoneNumber: string;
  bloodGroup?: string;
  membershipType: MembershipType;
  profilePictureUrl?: string;
  socialLinks?: SocialLink[];
  rollNumber?: string;
  yearOfGraduation?: number;
  currentlyWorkingAt?: string;
  designation?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}