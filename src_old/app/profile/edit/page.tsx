"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEPARTMENTS, MEMBERSHIP_TYPES, SOCIAL_MEDIA_TYPES } from "@/lib/auth/constants";
import { getBackendBaseUrl } from "@/lib/config";
import { MembershipType, PublicAuthUser, SocialLink } from "@/types/auth";

interface EditForm {
  fullName: string;
  email: string;
  series: string;
  department: string;
  phoneNumber: string;
  bloodGroup: string;
  membershipType: MembershipType;
  profilePictureUrl: string;
  rollNumber: string;
  yearOfGraduation: string;
  currentlyWorkingAt: string;
  designation: string;
  newPassword: string;
  confirmNewPassword: string;
}

function toForm(user: PublicAuthUser): EditForm {
  return {
    fullName: user.fullName,
    email: user.email,
    series: String(user.series),
    department: user.department,
    phoneNumber: user.phoneNumber,
    bloodGroup: user.bloodGroup || "",
    membershipType: user.membershipType,
    profilePictureUrl: user.profilePictureUrl || "",
    rollNumber: user.rollNumber || "",
    yearOfGraduation: user.yearOfGraduation ? String(user.yearOfGraduation) : "",
    currentlyWorkingAt: user.currentlyWorkingAt || "",
    designation: user.designation || "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<EditForm | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [pendingType, setPendingType] = useState("facebook");
  const [otherType, setOtherType] = useState("");
  const [pendingLink, setPendingLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch(`${getBackendBaseUrl()}/api/auth/profile`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          router.push("/login?redirect=/profile/edit");
          return;
        }
        setForm(toForm(data.user as PublicAuthUser));
        setSocialLinks((data.user.socialLinks as SocialLink[]) || []);
      } catch {
        router.push("/login?redirect=/profile/edit");
      } finally {
        setLoading(false);
      }
    }

    void loadProfile();
  }, [router]);

  function updateField<K extends keyof EditForm>(key: K, value: EditForm[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function addSocialLink() {
    const url = pendingLink.trim();
    if (!url) return;
    const platform = pendingType === "other" ? otherType.trim() : pendingType;
    if (!platform) return;
    setSocialLinks((prev) => [...prev, { platform, url }]);
    setPendingType("facebook");
    setOtherType("");
    setPendingLink("");
  }

  function removeSocialLink(index: number) {
    setSocialLinks((prev) => prev.filter((_, idx) => idx !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    setSaving(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        series: Number(form.series),
        yearOfGraduation: form.yearOfGraduation ? Number(form.yearOfGraduation) : undefined,
        socialLinks,
      };

      const response = await fetch(`${getBackendBaseUrl()}/api/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(Array.isArray(data.errors) ? data.errors.join(" ") : data.error || "Update failed.");
        return;
      }

      setForm(toForm(data.user as PublicAuthUser));
      setSocialLinks((data.user.socialLinks as SocialLink[]) || []);
      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Failed to save profile updates.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return (
      <main className="site-shell">
        <Navbar />
        <section className="px-6 pb-20 pt-40 text-center text-lg">Loading profile...</section>
        <Footer />
      </main>
    );
  }

  const isAlumni = form.membershipType === "alumni";

  return (
    <main className="site-shell">
      <Navbar showQueryButton={false} />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-5xl rca-panel p-8 md:p-12">
          <h1 className="site-section-title text-center">Edit Profile</h1>
          <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rca-input" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} required />
              <input className="rca-input" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
              <input className="rca-input" value={form.phoneNumber} onChange={(e) => updateField("phoneNumber", e.target.value)} required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input className="rca-input" type="number" value={form.series} onChange={(e) => updateField("series", e.target.value)} required />
              <select className="rca-input" value={form.department} onChange={(e) => updateField("department", e.target.value)}>
                {DEPARTMENTS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <input className="rca-input" placeholder="Blood Group" value={form.bloodGroup} onChange={(e) => updateField("bloodGroup", e.target.value)} />
              <select className="rca-input" value={form.membershipType} onChange={(e) => updateField("membershipType", e.target.value as MembershipType)}>
                {MEMBERSHIP_TYPES.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
              <input className="rca-input" placeholder="Profile Picture URL" value={form.profilePictureUrl} onChange={(e) => updateField("profilePictureUrl", e.target.value)} />
            </div>

            {!isAlumni && (
              <input className="rca-input" placeholder="Roll Number" value={form.rollNumber} onChange={(e) => updateField("rollNumber", e.target.value)} required />
            )}

            {isAlumni && (
              <div className="grid gap-4 md:grid-cols-3">
                <input className="rca-input" type="number" placeholder="Year of Graduation" value={form.yearOfGraduation} onChange={(e) => updateField("yearOfGraduation", e.target.value)} required />
                <input className="rca-input" placeholder="Currently Working At" value={form.currentlyWorkingAt} onChange={(e) => updateField("currentlyWorkingAt", e.target.value)} required />
                <input className="rca-input" placeholder="Designation" value={form.designation} onChange={(e) => updateField("designation", e.target.value)} required />
              </div>
            )}

            <div className="rounded-2xl border border-red-100 p-4">
              <p className="mb-3 font-semibold text-red-700">Social Media Links</p>
              <div className="grid gap-3 md:grid-cols-3">
                <select className="rca-input" value={pendingType} onChange={(e) => setPendingType(e.target.value)}>
                  {SOCIAL_MEDIA_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {pendingType === "other" && <input className="rca-input" placeholder="Custom type" value={otherType} onChange={(e) => setOtherType(e.target.value)} />}
                <input className="rca-input" placeholder="https://profile-link" value={pendingLink} onChange={(e) => setPendingLink(e.target.value)} />
              </div>
              <button type="button" className="mt-3 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600" onClick={addSocialLink}>
                + Add Social Link
              </button>
              <div className="mt-4 space-y-2">
                {socialLinks.map((item, idx) => (
                  <div key={`${item.platform}-${idx}`} className="flex items-center justify-between rounded-lg border border-red-100 bg-white p-3 text-sm">
                    <span>{item.platform}: {item.url}</span>
                    <button type="button" className="font-semibold text-red-600" onClick={() => removeSocialLink(idx)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input className="rca-input" type="password" placeholder="New Password (optional)" value={form.newPassword} onChange={(e) => updateField("newPassword", e.target.value)} />
              <input className="rca-input" type="password" placeholder="Confirm New Password" value={form.confirmNewPassword} onChange={(e) => updateField("confirmNewPassword", e.target.value)} />
            </div>

            {message && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p>}

            <button type="submit" className="rca-pill-button w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
