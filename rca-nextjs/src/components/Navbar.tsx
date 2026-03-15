"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Newspaper,
  Calendar,
  BookOpen,
  Users,
  UserPlus,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  showQueryButton?: boolean;
}

export default function Navbar({ showQueryButton = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/What", icon: Info, label: "About" },
    { href: "/news", icon: Newspaper, label: "News" },
    { href: "/event", icon: Calendar, label: "Events" },
    { href: "/library", icon: BookOpen, label: "Library" },
    { href: "/alumni", icon: Users, label: "Alumni" },
    { href: "/membership", icon: UserPlus, label: "Membership" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="site-nav">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/image/RCA.png" alt="RCA Logo" className="h-16 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="text-amber-50 text-xl font-bold">RCA</span>
            <span className="text-amber-50 text-sm font-semibold md:text-lg">
              Rajshahi City Association
            </span>
          </div>
        </Link>

        <ul className="hidden items-center space-x-8 text-sm font-semibold uppercase text-amber-50 md:flex">
          {navItems.map((item) => (
            <li key={item.href} className="rca-nav-link">
              <item.icon size={18} />
              <Link
                href={item.href}
                className={isActive(item.href) ? "underline underline-offset-4" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {showQueryButton && (
            <li>
              <Link href="/query" className="rca-pill-button">
                Any Query
              </Link>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-amber-50 backdrop-blur-lg hover:bg-white/20"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>

        <div
          className="space-y-1 md:hidden cursor-pointer z-20"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {!menuOpen ? (
            <>
              <div className="w-6 h-0.5 bg-amber-50"></div>
              <div className="w-6 h-0.5 bg-amber-50"></div>
              <div className="w-6 h-0.5 bg-amber-50"></div>
            </>
          ) : (
            <X size={24} className="text-amber-50" />
          )}
        </div>
      </div>

      {menuOpen && (
        <ul className="site-mobile-menu">
          {navItems.map((item) => (
            <li
              key={item.href}
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <item.icon size={16} />
              <Link
                href={item.href}
                className={isActive(item.href) ? "underline underline-offset-4" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-amber-50"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          {showQueryButton && (
            <li>
              <Link
                href="/query"
                className="rca-pill-button flex w-full text-center bg-red"
                onClick={() => setMenuOpen(false)}
              >
                Any Query
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
