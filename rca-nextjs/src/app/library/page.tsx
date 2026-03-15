"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Cpu,
  Zap,
  Radio,
  Waves,
  Building2,
  Map,
  Calculator,
  Home,
  Settings,
  Wrench,
  Layers,
  Box,
  Factory,
  FlaskConical,
} from "lucide-react";

const departments = [
  {
    name: "CSE",
    fullName: "Computer Science & Engineering",
    icon: Cpu,
    href: "/library/cse",
  },
  {
    name: "EEE",
    fullName: "Electrical & Electronic Engineering",
    icon: Zap,
    href: "/library/eee",
  },
  {
    name: "ECE",
    fullName: "Electronics & Communication Engineering",
    icon: Radio,
    href: "/library/ece",
  },
  {
    name: "ETE",
    fullName: "Electronics & Telecommunication Engineering",
    icon: Waves,
    href: "/library/ete",
  },
  {
    name: "CE",
    fullName: "Civil Engineering",
    icon: Building2,
    href: "/library/ce",
  },
  {
    name: "URP",
    fullName: "Urban & Regional Planning",
    icon: Map,
    href: "/library/urp",
  },
  {
    name: "BECM",
    fullName: "Building Engineering & Construction Management",
    icon: Calculator,
    href: "/library/becm",
  },
  {
    name: "Arch",
    fullName: "Architecture",
    icon: Home,
    href: "/library/arch",
  },
  {
    name: "ME",
    fullName: "Mechanical Engineering",
    icon: Settings,
    href: "/library/me",
  },
  {
    name: "CME",
    fullName: "Chemical & Materials Engineering",
    icon: Wrench,
    href: "/library/cme",
  },
  {
    name: "MTE",
    fullName: "Mechatronics Engineering",
    icon: Layers,
    href: "/library/mte",
  },
  {
    name: "MSE",
    fullName: "Materials Science & Engineering",
    icon: Box,
    href: "/library/mse",
  },
  {
    name: "IPE",
    fullName: "Industrial & Production Engineering",
    icon: Factory,
    href: "/library/ipe",
  },
  {
    name: "ChE",
    fullName: "Chemical Engineering",
    icon: FlaskConical,
    href: "/library/che",
  },
];

export default function Library() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold uppercase text-red-700 md:text-5xl">
            RCA Book Library
          </h1>
          <p className="mb-14 text-lg text-gray-700">
            Choose your department to explore books & resources
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {departments.map((dept) => (
              <Link
                key={dept.name}
                href={dept.href}
                className="group rounded-3xl bg-white p-10 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <dept.icon className="w-14 h-14 mx-auto text-red-600 mb-4" />
                <h2 className="text-2xl font-bold">{dept.name}</h2>
                <p className="mb-4 text-gray-600">
                  {dept.fullName}
                </p>
                <span className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
                  Browse
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
