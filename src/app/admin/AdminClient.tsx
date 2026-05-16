"use client";

import { useState } from "react";
import { AuthUserRecord } from "@/types/auth";
import { updateUserStatus, makeUserAdmin, deleteUserAction } from "./actions";

export default function AdminClient({
  users,
  currentUserEmail,
}: {
  users: AuthUserRecord[];
  currentUserEmail: string;
}) {
  const [activeTab, setActiveTab] = useState<"requests" | "all">("requests");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AuthUserRecord | null>(null);

  const pendingRequests = users.filter((u) => u.status === "pending");
  const allUsers = users;

  const filteredUsers = (activeTab === "requests" ? pendingRequests : allUsers).filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phoneNumber.includes(search)
  );

  async function handleApprove(userId: string) {
    if (confirm("Approve this user?")) {
      await updateUserStatus(userId, "approved");
      setSelectedUser(null);
    }
  }

  async function handleReject(userId: string) {
    if (confirm("Reject this user?")) {
      await updateUserStatus(userId, "rejected");
      setSelectedUser(null);
    }
  }

  async function handleMakeAdmin(userId: string) {
    if (confirm("Promote this user to Admin?")) {
      await makeUserAdmin(userId);
      setSelectedUser(null);
    }
  }

  async function handleDelete(userId: string) {
    if (confirm("Are you sure you want to completely DELETE this user? This action cannot be undone.")) {
      await deleteUserAction(userId);
      setSelectedUser(null);
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-800 shadow rounded-lg p-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-zinc-700 mb-6">
        <button
          onClick={() => setActiveTab("requests")}
          className={`pb-4 px-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === "requests"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          Registration Requests ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-4 px-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === "all"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          All Users ({allUsers.length})
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
          <thead className="bg-gray-50 dark:bg-zinc-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.fullName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.membershipType} - Series {user.series}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.role}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {activeTab === "requests" ? (
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Make Admin
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-zinc-800 w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                User Details
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedUser.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedUser.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department & Series</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedUser.department} - {selectedUser.series}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Membership Type</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {selectedUser.membershipType}
                </p>
              </div>
              {selectedUser.rollNumber && (
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedUser.rollNumber}</p>
                </div>
              )}
              {selectedUser.designation && (
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedUser.designation}</p>
                </div>
              )}
              {selectedUser.currentlyWorkingAt && (
                <div>
                  <p className="text-sm text-gray-500">Working At</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedUser.currentlyWorkingAt}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedUser.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedUser.role}</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 flex justify-end space-x-3">
              {selectedUser.status === "pending" && (
                <>
                  <button
                    onClick={() => handleReject(selectedUser.id)}
                    className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 rounded-md"
                  >
                    Reject User
                  </button>
                  <button
                    onClick={() => handleApprove(selectedUser.id)}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                  >
                    Approve User
                  </button>
                </>
              )}
              {selectedUser.status !== "pending" && selectedUser.role !== "admin" && (
                <button
                  onClick={() => handleMakeAdmin(selectedUser.id)}
                  className="px-4 py-2 border border-blue-300 text-blue-700 hover:bg-blue-50 rounded-md"
                >
                  Make Admin
                </button>
              )}
              {selectedUser.id !== currentUserEmail && selectedUser.email !== currentUserEmail && (
                <button
                  onClick={() => handleDelete(selectedUser.id)}
                  className="px-4 py-2 border border-red-500 text-red-700 hover:bg-red-50 rounded-md ml-2"
                >
                  Delete User
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}