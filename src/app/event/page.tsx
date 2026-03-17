import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Events() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="site-section-title mb-10">
            Upcoming Events
          </h2>
          <div className="rca-panel mx-auto max-w-3xl px-8 py-10">
            <p className="site-section-copy text-xl">
              No upcoming events at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
