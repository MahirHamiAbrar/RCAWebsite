import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Note: Add actual book data for 1st Year Even semester here
const books = [
  {
    code: "MATH 1201",
    title: "Differential Equations",
    image: "/image/RCA.png", // Placeholder
    driveLink: "#",
  },
  {
    code: "PHY 1201",
    title: "Physics II",
    image: "/image/RCA.png", // Placeholder
    driveLink: "#",
  },
  {
    code: "CSE 1201",
    title: "Computer Programming",
    image: "/image/RCA.png", // Placeholder
    driveLink: "#",
  },
];

export default function CSE12() {
  return (
    <main className="site-shell">
      <Navbar showQueryButton={false} />

      <section className="pt-40 pb-10 px-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-red-700">
          CSE 1st Year – EVEN Semester
        </h1>
        <p className="text-gray-700">
          Available course books and materials
        </p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book, index) => (
            <div
              key={index}
              className="rca-card overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.code}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-500">
                  Course Code
                </p>
                <h2 className="text-xl font-bold text-gray-800">
                  {book.code}
                </h2>
                <p className="text-gray-600">{book.title}</p>
                <a
                  href={book.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition"
                >
                  Browse Book
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
