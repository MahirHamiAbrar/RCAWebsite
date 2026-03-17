import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-20 pt-36 md:flex-row md:items-start">
        <div className="flex-1 flex justify-center md:justify-start">
          <img
            src="/image/RCA.png"
            alt="RCA Logo"
            className="w-64 sm:w-80 md:w-96 lg:w-80 rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="site-section-title">About RCA</h2>
          <p className="text-lg leading-relaxed text-red-600 md:text-xl">
            The Rajshahi City Association (RCA) of RUET, established in 2003,
            has been dedicated to connecting students and alumni from Rajshahi
            City, fostering a strong and supportive community. Over the years,
            the association has actively organized a variety of programs,
            including farewells, receptions, and cultural events like Pitha
            Utsab.
          </p>
          <p className="text-lg leading-relaxed text-red-600 md:text-xl">
            In addition to social and cultural activities, RCA is committed to
            charitable and community-focused initiatives such as cleaning
            campaigns, tree plantation drives, and other charity works, making a
            positive impact both within and beyond the university.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
