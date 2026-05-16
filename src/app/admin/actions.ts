"use server";

import { revalidatePath } from "next/cache";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getAllUsers, getUserById, upsertUser, deleteUser } from "@/lib/auth/appwrite";

export async function checkAdmin() {
  const session = await getSessionFromCookies();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function fetchAllUsersAction() {
  await checkAdmin();
  const users = await getAllUsers();
  return users;
}

export async function updateUserStatus(userId: string, newStatus: "approved" | "rejected") {
  await checkAdmin();
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");

  user.status = newStatus;
  await upsertUser(user);
  revalidatePath("/admin");
}

export async function makeUserAdmin(userId: string) {
  await checkAdmin();
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");

  user.role = "admin";
  // also approve if they were pending
  if (user.status === "pending") {
    user.status = "approved";
  }
  
  await upsertUser(user);
  revalidatePath("/admin");
}

export async function deleteUserAction(userId: string) {
  await checkAdmin();
  await deleteUser(userId);
  revalidatePath("/admin");
}