"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Member {
  name: string;
  designation: string;
  department: string;
  series: string;
  photo: string;
}

const sheetID = "1C4iR7Dcov7waR1wjrlCwVWOWYE2Q_bSbV68NuJx0Wrs";
const gid = "0";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?gid=${gid}`;

// Google Drive → image URL converter
function driveToImage(link: string) {
  if (!link) return "";
  const match = link.match(/[-\w]{25,}/);
  return match
    ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w300`
    : "";
}

// Generate avatar from initials
function getInitialsAvatar(name: string) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}`;
}

export default function Membership() {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const members = rows.map((row: any) => ({
          name: String(row.c[0]?.v ?? ""),
          designation: String(row.c[1]?.v ?? ""),
          department: String(row.c[2]?.v ?? ""),
          series: String(row.c[3]?.v ?? ""),
          photo: driveToImage(row.c[4]?.v ?? ""),
        }));

        setMemberData(members);
        setFilteredData(members);
      })
      .catch((err) => console.error("Sheet load error:", err));
  }, []);

  // Filter members based on search query
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = memberData.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.series.toLowerCase().includes(q)
    );
    setFilteredData(filtered);
  }, [searchQuery, memberData]);

  return (
    <main className="site-shell">
      <Navbar />

      <section className="pt-40 pb-8 px-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-red-700">
          RCA Members
        </h1>
        <p className="mb-6 text-gray-700">
          RCA Executive Committee 2025–26
        </p>

        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name, designation, department, series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rca-input"
          />
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredData.map((member, index) => {
            const fallbackImage = getInitialsAvatar(member.name);
            const displayImage = member.photo || fallbackImage;

            return (
              <div
                key={index}
                className="rca-card p-6 text-center"
              >
                <img
                  src={displayImage}
                  alt={member.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover bg-gray-100"
                />

                <h3 className="text-lg font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-red-600">
                  {member.designation}
                </p>

                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {member.department}
                  </p>
                  <p>
                    <span className="font-semibold">Series:</span>{" "}
                    {member.series}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <p className="mt-8 text-center text-gray-600">
            No members found matching your search.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
