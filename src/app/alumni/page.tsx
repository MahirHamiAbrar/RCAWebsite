"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBackendBaseUrl } from "@/lib/config";
import { getInitials } from "@/lib/utils";

interface Alumni {
  name: string;
  department: string;
  series: string;
  blood: string;
  email: string;
  status: string;
  workplace: string;
  gradient: string;
}

const sheetID = "1OtQTRbmN032jU0FxgjJEQq9HVqup3u39NTxTSpKo6iE";
const gid = "0";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?gid=${gid}`;

// Random gradient generator for avatars
function randomGradient() {
  const gradients = [
    "linear-gradient(135deg, #f87171, #fb923c)",
    "linear-gradient(135deg, #fb923c, #facc15)",
    "linear-gradient(135deg, #facc15, #4ade80)",
    "linear-gradient(135deg, #4ade80, #22d3ee)",
    "linear-gradient(135deg, #22d3ee, #60a5fa)",
    "linear-gradient(135deg, #60a5fa, #a78bfa)",
    "linear-gradient(135deg, #a78bfa, #f472b6)",
    "linear-gradient(135deg, #f472b6, #f87171)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export default function Alumni() {
  const router = useRouter();
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [filteredData, setFilteredData] = useState<Alumni[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        const response = await fetch(`${getBackendBaseUrl()}/api/auth/me`, {
          credentials: "include",
        });
        if (!response.ok) {
          router.replace("/login?redirect=/alumni");
          return;
        }
      } catch {
        router.replace("/login?redirect=/alumni");
        return;
      }
      setIsCheckingAuth(false);
    }

    void verifyAuth();
  }, [router]);

  useEffect(() => {
    if (isCheckingAuth) return;

    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const alumni = rows.map((row: any) => ({
          name: String(row.c[0]?.v ?? ""),
          department: String(row.c[1]?.v ?? ""),
          series: String(row.c[2]?.v ?? ""),
          blood: String(row.c[3]?.v ?? ""),
          email: String(row.c[4]?.v ?? ""),
          status: String(row.c[5]?.v ?? ""),
          workplace: String(row.c[6]?.v ?? ""),
          gradient: randomGradient(),
        }));

        setAlumniData(alumni);
        setFilteredData(alumni);
      })
      .catch((err) => console.error("Sheet load error:", err));
  }, [isCheckingAuth]);

  // Filter alumni based on search query
  useEffect(() => {
    if (isCheckingAuth) return;

    const q = searchQuery.toLowerCase();
    const filtered = alumniData.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q) ||
        a.series.toLowerCase().includes(q) ||
        a.workplace.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q) ||
        a.blood.toLowerCase().includes(q)
    );
    setFilteredData(filtered);
  }, [searchQuery, alumniData, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <main className="site-shell">
        <Navbar />
        <section className="px-6 pb-16 pt-40 text-center text-lg">Checking access...</section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="site-shell">
      <Navbar />

      <section className="pt-40 pb-6 px-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-red-700">
          RCA Alumni
        </h1>
        <p className="mb-6 text-gray-700">
          RUET Alumni Directory
        </p>

        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name, department, series, workplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rca-input"
          />
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredData.map((alumni, index) => (
            <div
              key={index}
              className="rca-card p-6"
            >
              <div
                className="w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundImage: alumni.gradient }}
              >
                <span className="text-white text-3xl font-bold">
                  {getInitials(alumni.name)}
                </span>
              </div>

              <h3 className="text-center text-lg font-bold text-gray-800">
                {alumni.name}
              </h3>
              <p className="text-center text-sm font-semibold text-red-600">
                {alumni.department}
              </p>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Series:</span> {alumni.series}
                </p>
                <p>
                  <span className="font-semibold">Blood:</span> {alumni.blood}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {alumni.status}
                </p>
                <p className="break-all">
                  <span className="font-semibold">Email:</span> {alumni.email}
                </p>
                <p>
                  <span className="font-semibold">Working At:</span>{" "}
                  {alumni.workplace}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className="mt-8 text-center text-gray-600">
            No alumni found matching your search.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
