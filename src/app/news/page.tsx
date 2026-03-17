import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function News() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="site-section-title mb-10">
            News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="rca-card float-animation overflow-hidden">
              <img
                src="/image/541347879_122168365064479647_2720162452430955360_n.jpg"
                alt="News 1"
                className="w-full h-50 object-cover transition duration-500 hover:opacity-90 hover:brightness-110"
              />
              <div className="p-4 text-lg font-semibold text-red-600 transition hover:text-red-500">
                Raising Awareness: Engineers' Rights and Current Challenges for
                HSC Students in Rajshahi
              </div>
            </div>

            <div className="rca-card float-animation overflow-hidden">
              <img
                src="/image/474113963_122134064570479647_2985875398382026066_n.jpg"
                alt="News 2"
                className="w-full h-50 object-cover transition duration-500 hover:opacity-90 hover:brightness-110"
              />
              <div className="p-4 text-lg font-semibold text-red-600 transition hover:text-red-500">
                Grand Celebration, Colorful Decor- RUET Enthralled by Pitha
                Festival
              </div>
            </div>

            <div className="rca-card float-animation overflow-hidden">
              <img
                src="/image/Screenshot 2025-09-15 033228.png"
                alt="News 3"
                className="w-full h-50 object-cover transition duration-500 hover:opacity-90 hover:brightness-110"
              />
              <div className="p-4 text-lg font-semibold text-red-600 transition hover:text-red-500">
                Farewell for 17 Series and Grand Reception for 21 Series
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
