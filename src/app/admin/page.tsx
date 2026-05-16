import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { fetchAllUsersAction } from "./actions";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSessionFromCookies();
  
  if (!session) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You do not have permission to view the admin panel.
          </p>
        </div>
      </div>
    );
  }

  const users = await fetchAllUsersAction();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go to Main Site
          </Link>
        </div>
        <AdminClient users={users} currentUserEmail={session.email} />
      </div>
    </div>
  );
}