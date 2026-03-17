"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBackendBaseUrl } from "@/lib/config";

export default function LoginPage() {
  const router = useRouter();
  const [redirect, setRedirect] = useState("/alumni");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextPath = params.get("redirect");
    if (nextPath) {
      setRedirect(nextPath);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${getBackendBaseUrl()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      router.push(redirect);
    } catch {
      setError("Could not connect to authentication server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site-shell">
      <Navbar showQueryButton={false} />

      <section className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-lg rca-panel p-8 md:p-10">
          <h1 className="site-section-title text-center">Login</h1>
          <p className="site-section-copy mt-2 text-center">
            Continue with your email or phone number and password.
          </p>

          <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
            <input
              className="rca-input"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <input
              className="rca-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button className="rca-pill-button w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            New here?{" "}
            <Link href="/register" className="font-semibold text-red-700 underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
