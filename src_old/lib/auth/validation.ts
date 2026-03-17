import { MembershipType, RegisterPayload } from "@/types/auth";
import { DEPARTMENTS } from "@/lib/auth/constants";

const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(phone: string) {
  const value = phone.replace(/\s|-/g, "");
  if (value.startsWith("+880")) {
    return `0${value.slice(4)}`;
  }
  if (value.startsWith("880")) {
    return `0${value.slice(3)}`;
  }
  return value;
}

export function passwordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^\w\s]/.test(password)) score += 1;
  return score;
}

export function validateRegisterPayload(payload: RegisterPayload) {
  const errors: string[] = [];

  if (!payload.fullName?.trim()) errors.push("Full name is required.");
  if (!payload.email?.trim() || !emailRegex.test(payload.email.trim())) {
    errors.push("A valid email is required.");
  }

  const normalizedPhone = normalizePhone(payload.phoneNumber || "");
  if (!bdPhoneRegex.test(normalizedPhone)) {
    errors.push("Phone number must be a valid Bangladeshi number.");
  }

  if (!Number.isFinite(Number(payload.series))) {
    errors.push("Series must be a valid number.");
  }

  if (!DEPARTMENTS.includes(payload.department as (typeof DEPARTMENTS)[number])) {
    errors.push("Department must be selected from the provided list.");
  }

  if (!payload.membershipType) {
    errors.push("Membership type is required.");
  }

  if (!payload.password || payload.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  if (passwordStrength(payload.password || "") < 3) {
    errors.push("Password is too weak.");
  }

  if (payload.password !== payload.confirmPassword) {
    errors.push("Password and confirm password do not match.");
  }

  validateMembershipSpecificFields(payload.membershipType, payload, errors);

  return {
    isValid: errors.length === 0,
    errors,
    normalizedPhone,
  };
}

export function validateMembershipSpecificFields(
  membershipType: MembershipType,
  payload: Partial<RegisterPayload>,
  errors: string[]
) {
  if (["regular", "committee"].includes(membershipType) && !payload.rollNumber?.trim()) {
    errors.push("Roll number is required for regular and committee members.");
  }

  if (membershipType === "alumni") {
    if (!Number.isFinite(Number(payload.yearOfGraduation))) {
      errors.push("Year of graduation is required for alumni.");
    }
    if (!payload.currentlyWorkingAt?.trim()) {
      errors.push("Currently working at is required for alumni.");
    }
    if (!payload.designation?.trim()) {
      errors.push("Designation is required for alumni.");
    }
  }
}

export function allowedDepartments() {
  return [...DEPARTMENTS];
}