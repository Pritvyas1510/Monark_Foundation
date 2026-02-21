// src/components/TeamSection.jsx
import { useState } from "react";
import TeamMemberCard from "../../../components/TeamMemberCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Hasmukh_Sir from "../../../../Public/Image/Hasmukh_Sir.JPG";
import satish_sir from "../../../../Public/Image/satish_sir.JPG";
import monark_sir from "../../../../Public/Image/Monark_sir.jpg";
import zeel_sir from "../../../../Public/Image/Zeel_sir.jpeg"

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      image: Hasmukh_Sir,
      name: "Hasmukh Goswami",
      position: "President",
      bio: "Strategic social leader advancing community empowerment and sustainable development initiatives.",
      email: "vyasprit962@gmail.com",
    },
    {
      id: 2,
      image: satish_sir,
      name: "Satish Goswami",
      position: "Vice President",
      bio: "Dedicated leader driving education reform and women empowerment programs nationwide.",
      email: "",
    },
    {
      id: 3,
      image: zeel_sir,
      name: "Zeel Goswami",
      position: "Director-MRDC",
      bio: "Leads MRDC initiatives through strategic planning, team coordination, and strong community partnerships.",
      email: "",
    },
    {
      id: 4,
      image: monark_sir,
      name: "Monark Goswami",
      position: "CEO",
      bio: "Leads strategic growth, outreach initiatives, and operational excellence for the foundation.",
      email: "",
    },
  ];

  /* ---------- Mobile Slider State ---------- */
  const [mobileIndex, setMobileIndex] = useState(0);

  const nextSlide = () => {
    setMobileIndex((prev) => (prev < teamMembers.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

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

        {/* ================= Desktop Grid ================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} {...member} />
          ))}
        </div>

        {/* ================= Mobile Slider ================= */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
              }}
            >
              {teamMembers.map((member) => (
                <div key={member.id} className="min-w-full px-1">
                  <TeamMemberCard {...member} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              onClick={prevSlide}
              disabled={mobileIndex === 0}
              className="p-3 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>

            <span className="text-sm font-semibold text-black">
              {mobileIndex + 1} / {teamMembers.length}
            </span>

            <button
              onClick={nextSlide}
              disabled={mobileIndex === teamMembers.length - 1}
              className="p-3 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
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
