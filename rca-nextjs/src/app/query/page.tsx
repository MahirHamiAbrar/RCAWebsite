"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Query() {
  const [formData, setFormData] = useState({
    name: "",
    series: "",
    roll: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit to API
    try {
      const response = await fetch("/api/submit-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect will be handled by the API
        window.location.href = "/confirmation";
      } else {
        alert("Failed to submit query. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="site-shell">
      <Navbar showQueryButton={false} />

      <section className="pt-44 pb-24 px-6">
        <div className="rca-panel mx-auto max-w-xl p-10">
          <h1 className="mb-2 text-center text-3xl font-bold text-red-700">
            Submit Your Query
          </h1>
          <p className="mb-8 text-center text-gray-600">
            RCA is here to help you. Please fill out the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="rca-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Series
              </label>
              <input
                type="text"
                name="series"
                required
                placeholder="e.g. 19"
                value={formData.series}
                onChange={handleChange}
                className="rca-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Roll
              </label>
              <input
                type="text"
                name="roll"
                required
                placeholder="e.g. 1903001"
                value={formData.roll}
                onChange={handleChange}
                className="rca-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Comments
              </label>
              <textarea
                name="comments"
                rows={4}
                required
                placeholder="Write your query..."
                value={formData.comments}
                onChange={handleChange}
                className="rca-input"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-red-600 py-3 font-bold text-amber-50 hover:bg-red-700"
            >
              Submit Query
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
