"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-16 lg:px-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-x-20">
          <div className="lg:w-1/2 text-center lg:text-left space-y-4">
            <h2 className="animate-fadeSlide text-5xl font-bold uppercase text-black">
              WELCOME TO
            </h2>

            <span className="animate-fadeSlide delay-100 block text-5xl font-bold uppercase text-red-600">
              RAJSHAHI CITY ASSOCIATION RUET
            </span>

            <p className="animate-fadeSlide delay-200 text-xl text-gray-700">
              Uniting Rajshahi City Students and Alumni of RUET to share
              knowledge, inspire growth and build a strong network.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/image/RCA.png"
              alt="RCA Photo"
              className="max-w-60"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24 transition duration-500 hover:-translate-y-2 hover:scale-[1.01]">
        <Swiper
          className="mySwiper rounded-xl shadow-2xl"
          loop={true}
          autoplay={false}
          slidesPerView={1}
          spaceBetween={30}
          grabCursor={true}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Pagination, Navigation, Autoplay]}
        >
          <SwiperSlide className="relative">
            <div className="relative">
              <img
                src="/image/IMG_0388.JPG"
                alt="RCA"
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold text-amber-50">
                    RAJSHAHI CITY ASSOCIATION, RUET
                  </h2>
                  <p className="text-lg text-amber-50">
                    Serving the community together
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/profile.php/?id=100069227313850",
                        "_blank"
                      )
                    }
                    className="rca-pill-button text-base md:px-8 md:py-3 md:text-xl"
                  >
                    JOIN US
                  </button>
                  <button className="text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="relative">
              <img
                src="/image/IMG_0387.JPG"
                alt="Alumni"
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold text-amber-50">
                    ALUMNI NETWORK
                  </h2>
                  <p className="text-lg text-amber-50">
                    Connecting RUET Alumni and Students
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/alumni" className="rca-pill-button">
                    ALUMNI
                  </Link>
                  <button className="text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="relative">
              <img
                src="/image/Green Yellow Books Library Fundraising Raffle Ticket.jpg"
                alt="Library"
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold text-amber-50">
                    BOOK LIBRARY
                  </h2>
                  <p className="text-lg text-amber-50">
                    Finding your departmental books
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/library" className="rca-pill-button">
                    BROWSE YOUR BOOK
                  </Link>
                  <button className="text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="relative">
              <img
                src="/image/IMG_0389.JPG"
                alt="Charity"
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold text-amber-50">
                    CHARITY WORK
                  </h2>
                  <p className="text-lg text-amber-50">
                    {" "}
                    Helping hands, brighter lives
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/profile.php/?id=100069227313850",
                        "_blank"
                      )
                    }
                    className="rca-pill-button"
                  >
                    DONATE
                  </button>
                  <button className="text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="relative">
              <img
                src="/image/IMG_0591.JPG"
                alt="Membership"
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-3xl font-bold text-amber-50">
                    RCA 19 SERIES FAREWELL AND 24 RECEPTION
                  </h2>
                  <p className="text-lg text-amber-50">
                    New faces arrive, old memories remain
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/membership" className="rca-pill-button">
                    MEMBERSHIP
                  </Link>
                  <button className="text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="swiper-button-next !text-amber-50"></div>
        <div className="swiper-button-prev !text-amber-50"></div>
        <div className="swiper-pagination"></div>
      </div>

      <Footer />
    </main>
  );
}
