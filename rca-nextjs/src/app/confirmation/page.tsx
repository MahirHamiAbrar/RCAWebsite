"use client";

import Link from "next/link";

export default function Confirmation() {
  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-6">
      <div className="rca-panel max-w-md p-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-pop flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 text-5xl">
            ✔
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-red-700">
          Query Submitted!
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for contacting RCA RUET. We have successfully received your
          query.
        </p>

        <Link href="/query" className="rca-pill-button px-6 py-3 text-base text-white">
          Submit Another Query
        </Link>

        <div className="mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
