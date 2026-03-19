"use client";

import { useEffect, useMemo, useState } from "react";
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
  LogIn,
  LogOut,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { getBackendBaseUrl } from "@/lib/config";
import { PublicAuthUser } from "@/types/auth";

interface NavbarProps {
  showQueryButton?: boolean;
}

export default function Navbar({ showQueryButton = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<PublicAuthUser | null>(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/What", icon: Info, label: "About" },
    { href: "/news", icon: Newspaper, label: "News" },
    { href: "/event", icon: Calendar, label: "Events" },
    { href: "/library", icon: BookOpen, label: "Library" },
    { href: "/alumni", icon: Users, label: "Alumni" },
    { href: "/membership", icon: UserPlus, label: "Committee Members" },
  ];

  const isActive = (href: string) => pathname === href;
  const visibleNavItems = user
    ? navItems
    : navItems.filter((item) => item.href !== "/alumni");

  const avatarText = useMemo(() => {
    if (!user?.fullName) return "RC";
    return user.fullName.trim().slice(0, 2).toUpperCase();
  }, [user]);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch(`${getBackendBaseUrl()}/api/auth/me`, {
          credentials: "include",
        });
        if (!response.ok) {
          setUser(null);
          return;
        }
        const data = await response.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      }
    }

    void loadUser();
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function handleLogout() {
    await fetch(`${getBackendBaseUrl()}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setProfileMenuOpen(false);
    setMenuOpen(false);
    window.location.href = "/";
  }

  return (
    <nav className="site-nav">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:py-4 md:px-6">
        {/* Logo on Left */}
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <img src="/image/RCA.png" alt="RCA Logo" className="h-12 w-auto sm:h-16" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-amber-50 text-lg font-bold sm:text-xl">RCA</span>
            <span className="text-amber-50 text-xs font-semibold sm:text-sm lg:text-base">
              {/* Rajshahi City Association, RUET */}
              RCA - RUET
            </span>
          </div>
        </Link>

        {/* Navigation in Center - Hidden on Mobile */}
        <div className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-50 lg:gap-6 lg:text-sm">
            {visibleNavItems.map((item) => (
              <li key={item.href} className="rca-nav-link">
                <item.icon size={16} />
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "underline underline-offset-4" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons on Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showQueryButton && (
            <Link href="/query" className="hidden rca-pill-button sm:inline-flex">
              Query
            </Link>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-amber-50 backdrop-blur-lg hover:bg-white/20 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 font-bold text-amber-50"
                aria-label="Open profile menu"
              >
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  avatarText
                )}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 top-12 min-w-48 rounded-xl border border-white/20 bg-black/85 p-2 text-xs uppercase text-amber-50 shadow-lg z-50">
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10"
                  >
                    <Settings size={14} /> Edit Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden rounded-full border border-white/30 px-3 py-2 text-xs font-bold uppercase sm:inline-block lg:text-sm">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-2 inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-white/30 bg-white/5 text-amber-50 backdrop-blur-lg hover:bg-white/15 transition"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[60px] bg-black/40 md:hidden z-30"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="site-mobile-menu md:hidden">
            <ul className="space-y-3">
              {visibleNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-white/10 ${
                      isActive(item.href) ? "bg-white/20 underline" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/20 pt-3 mt-3 space-y-3">
              {showQueryButton && (
                <Link
                  href="/query"
                  className="rca-pill-button w-full text-center text-sm flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Any Query
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-semibold text-amber-50 transition hover:bg-white/20"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>

              {user ? (
                <>
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Edit Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-white/10"
                  >
                    <div className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 font-bold text-xs">
                      {user.profilePictureUrl ? (
                        <img
                          src={user.profilePictureUrl}
                          alt={user.fullName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        avatarText
                      )}
                    </div>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
