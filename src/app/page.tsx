"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="px-4 sm:px-6 py-12 sm:pb-20 sm:pt-40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 sm:gap-10 lg:flex-row lg:gap-16">
          <div className="w-full max-w-2xl space-y-3 sm:space-y-4 text-center">
            <h2 className="animate-fadeSlide text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-black dark:text-white">
              WELCOME TO
            </h2>

            <span className="animate-fadeSlide delay-100 block text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-red-600">
              RAJSHAHI CITY ASSOCIATION RUET
            </span>

            <p className="animate-fadeSlide delay-200 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
              Uniting Rajshahi City Students and Alumni of RUET to share
              knowledge, inspire growth and build a strong network.
            </p>
          </div>

          <div className="flex w-full max-w-sm justify-center">
            <img
              src="/image/RCA.png"
              alt="RCA Photo"
              className="max-w-40 sm:max-w-56 lg:max-w-60"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full px-3 sm:px-4 sm:w-[96%] max-w-[1500px] pb-16 sm:pb-24 transition duration-500 hover:-translate-y-2 hover:scale-[1.01]">
        <Swiper
          className="mySwiper rounded-xl border border-white/25 shadow-2xl"
          loop={true}
          autoplay={false}
          navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          grabCursor={true}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          modules={[Pagination, Autoplay, Navigation]}
        >
          <SwiperSlide className="relative">
            <div className="relative">
              <img
                src="/image/IMG_0388.JPG"
                alt="RCA"
                className="h-56 sm:h-80 lg:h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 sm:p-6">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-50">
                    RAJSHAHI CITY ASSOCIATION, RUET
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-amber-50 mt-1 sm:mt-2">
                    Serving the community together
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/profile.php/?id=100069227313850",
                        "_blank"
                      )
                    }
                    className="rca-pill-button text-xs sm:text-base px-4 sm:px-6 py-1.5 sm:py-2.5 lg:px-8 lg:py-3 lg:text-xl"
                  >
                    JOIN US
                  </button>
                  <button className="text-xl sm:text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={24} className="sm:w-8 sm:h-8" />
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
                className="h-56 sm:h-80 lg:h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 sm:p-6">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-50">
                    ALUMNI NETWORK
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-amber-50 mt-1 sm:mt-2">
                    Connecting RUET Alumni and Students
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link href="/alumni" className="rca-pill-button text-xs sm:text-base px-4 sm:px-6 py-1.5 sm:py-2.5">
                    ALUMNI
                  </Link>
                  <button className="text-xl sm:text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={24} className="sm:w-8 sm:h-8" />
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
                className="h-56 sm:h-80 lg:h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 sm:p-6">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-50">
                    BOOK LIBRARY
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-amber-50 mt-1 sm:mt-2">
                    Finding your departmental books
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link href="/library" className="rca-pill-button text-xs sm:text-base px-3 sm:px-6 py-1.5 sm:py-2.5">
                    BROWSE BOOKS
                  </Link>
                  <button className="text-xl sm:text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={24} className="sm:w-8 sm:h-8" />
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
                className="h-56 sm:h-80 lg:h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 sm:p-6">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-50">
                    CHARITY WORK
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-amber-50 mt-1 sm:mt-2">
                    Helping hands, brighter lives
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/profile.php/?id=100069227313850",
                        "_blank"
                      )
                    }
                    className="rca-pill-button text-xs sm:text-base px-4 sm:px-6 py-1.5 sm:py-2.5"
                  >
                    DONATE
                  </button>
                  <button className="text-xl sm:text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={24} className="sm:w-8 sm:h-8" />
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
                className="h-56 sm:h-80 lg:h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 sm:p-6">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-amber-50">
                    RCA 19 SERIES FAREWELL AND 24 RECEPTION
                  </h2>
                  <p className="text-xs sm:text-base lg:text-lg text-amber-50 mt-1 sm:mt-2">
                    New faces arrive, old memories remain
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link href="/membership" className="rca-pill-button text-xs sm:text-base px-4 sm:px-6 py-1.5 sm:py-2.5">
                    MEMBERSHIP
                  </Link>
                  <button className="text-xl sm:text-3xl text-amber-50 cursor-pointer">
                    <ChevronRight size={24} className="sm:w-8 sm:h-8" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>

      <Footer />
    </main>
  );
}
