import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const books = [
  {
    code: "CSE 3101",
    title: "Database Systems",
    image: "/image/3.1/database.png",
    driveLink:
      "https://drive.google.com/file/d/1OEY7ao9ZK5DDjvTXb-uPTcOKD-gNvCOg/view?usp=sharing",
  },
  {
    code: "CSE 3103",
    title: "Theory of Computation",
    image: "/image/3.1/toc.png",
    driveLink:
      "https://drive.google.com/file/d/1yBzt6hSzEcXDh9bAdF-n8Vqg3CiVFomD/view?usp=sharing",
  },
  {
    code: "CSE 3105",
    title: "Computer Interfacing and Embedded System",
    image: "/image/3.1/intel.png",
    driveLink:
      "https://drive.google.com/file/d/1feb08wIM_0-tOt5HlWXcJT6jUpGYAbcT/view?usp=sharing",
  },
  {
    code: "CSE 3105",
    title: "Computer Interfacing and Embedded System",
    image: "/image/3.1/blum.png",
    driveLink:
      "https://drive.google.com/file/d/1JnAWuqoQLhKN7aGdQ2OEOutFmMQPMtpq/view?usp=sharing",
  },
  {
    code: "CSE 3105",
    title: "Computer Interfacing and Embedded System",
    image: "/image/3.1/cortex.png",
    driveLink:
      "https://drive.google.com/file/d/1cetkDNMv-kdLWOcI0Qid2Bzorsu3b2G-/view?usp=sharing",
  },
  {
    code: "CSE 3105",
    title: "Computer Interfacing and Embedded System",
    image: "/image/3.1/embedded.png",
    driveLink:
      "https://drive.google.com/file/d/1idrFX7Ti9aeV42cHc1MHPjW8NILs__QZ/view?usp=sharing",
  },
  {
    code: "CSE 3107",
    title: "Computer Architecture",
    image: "/image/3.1/architecture.png",
    driveLink:
      "https://drive.google.com/file/d/1HTY3mwFvChoVE3ydTHOdE7qI921i3gPD/view?usp=sharing",
  },
  {
    code: "CSE 3109",
    title: "Applied Statistics and Queuing Theory",
    image: "/image/3.1/prob.png",
    driveLink:
      "https://drive.google.com/file/d/1SAWvEK2ZkuI4Vq2vt74jLh3apxeVlOz2/view?usp=sharing",
  },
];

export default function CSE31() {
  return (
    <main className="site-shell">
      <Navbar showQueryButton={false} />

      <section className="pt-40 pb-10 px-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-red-700">
          CSE 3rd Year – ODD Semester
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
