// src/components/TeamSection.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import TeamMemberCard from "../../../components/TeamMemberCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Hasmukh_Sir from "../../../../Public/Image/Hasmukh_Sir.jpeg";
import satish_sir from "../../../../Public/Image/satish_sir.JPG";
import monark_sir from "../../../../Public/Image/Monark_sir.jpeg";
import zeel_sir from "../../../../Public/Image/Zeel_sir.jpeg";
import Varshaben from "../../../../Public/Image/Varshaben.jpeg"
import Urmilaben from "../../../../Public/Image/Urmilaben.jpeg"

const AUTO_SLIDE_MS = 30000; // change slide every 30 seconds

const TeamSection = () => {
 const teamMembers = [
  {
    id: 1,
    image: monark_sir,
    name: "Monark Goswami",
    position: "Founder",
    bio: "Founder of Monark Foundation, dedicated to creating lasting social impact through education, community development, and compassionate leadership that empowers individuals to build a brighter future.",
    email: "",
  },
  {
    id: 2,
    image: Hasmukh_Sir,
    name: "Dr. Hasmukh Goswami",
    position: "Board Member",
    bio: "Provides strategic guidance and visionary leadership to strengthen the Foundation's mission, ensuring sustainable growth and meaningful community impact through education and service.",
    email: "vyasprit962@gmail.com",
  },
  {
    id: 3,
    image: satish_sir,
    name: "Dr. Satish Goswami",
    position: "Board Member",
    bio: "Contributes valuable expertise and leadership to advance the Foundation's initiatives, promoting education, innovation, and community welfare with dedication and integrity.",
    email: "",
  },
  {
    id: 4,
    image: zeel_sir,
    name: "Zeel Goswami",
    position: "Board Member",
    bio: "Supports the Foundation's vision by encouraging youth engagement, social responsibility, and impactful programs that create positive and lasting change in society.",
    email: "",
  },
  {
    id: 5,
    image: Varshaben,
    name: "Dr. Varshaben H. Goswami",
    position: "Board Member",
    bio: "Committed to empowering communities through educational initiatives, women’s development, and compassionate service, helping transform lives with purpose and care.",
    email: "",
  },
  {
    id: 6,
    image: Urmilaben,
    name: "Dr. Urmilaben S. Goswami",
    position: "Board Member",
    bio: "Dedicated to fostering inclusive growth and social well-being by supporting initiatives that inspire learning, equality, and sustainable community development.",
    email: "",
  },
];
  /* ---------- Responsive items-per-slide (3 on desktop) ---------- */
  const getItemsPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop -> 3 box slider
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoSlideRef = useRef(null);

  // Recalculate items-per-view on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setSlideIndex(0); // reset to first slide to avoid out-of-range index
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Build slide "pages" — each page holds `itemsPerView` cards
  const totalSlides = Math.ceil(teamMembers.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide every 20 seconds, loops back to start, pauses on hover
  useEffect(() => {
    if (isHovered) return undefined;

    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_MS);

    return () => clearInterval(autoSlideRef.current);
  }, [nextSlide, isHovered]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-3">
            Our Team
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet the people behind the mission
          </h3>
        </div>

        {/* ================= 3-Box Slider ================= */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${totalSlides * 100}%`,
                transform: `translateX(-${slideIndex * (100 / totalSlides)}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, pageIdx) => {
                const start = pageIdx * itemsPerView;
                const pageItems = teamMembers.slice(start, start + itemsPerView);
                return (
                  <div
                    key={pageIdx}
                    className="flex gap-8 px-1"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    {pageItems.map((member) => (
                      <div
                        key={member.id}
                        className="flex-1"
                        style={{ minWidth: 0 }}
                      >
                        <TeamMemberCard {...member} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
            >
              <FaChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === slideIndex
                      ? "w-6 bg-orange-600"
                      : "w-2.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;