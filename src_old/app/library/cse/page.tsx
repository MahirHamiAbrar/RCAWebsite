"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen } from "lucide-react";

const semesters = [
  { year: "1st Year", semester: "Odd", href: "/library/cse/1-1" },
  { year: "1st Year", semester: "Even", href: "/library/cse/1-2" },
  { year: "2nd Year", semester: "Odd", href: "#" },
  { year: "2nd Year", semester: "Even", href: "#" },
  { year: "3rd Year", semester: "Odd", href: "/library/cse/3-1" },
  { year: "3rd Year", semester: "Even", href: "#" },
  { year: "4th Year", semester: "Odd", href: "#" },
  { year: "4th Year", semester: "Even", href: "#" },
];

export default function CSELibrary() {
  return (
    <main className="site-shell">
      <Navbar showQueryButton={false} />

      {/* CSE Library Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold uppercase text-red-700 md:text-5xl">
            CSE Department Library
          </h1>
          <p className="mb-14 text-lg text-gray-700">
            Select your year and semester for reading CSE related books
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {semesters.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold">{item.year}</h2>
                <p className="text-gray-600">{item.semester} Semester</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
