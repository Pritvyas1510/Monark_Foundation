// src/components/TeamSection.jsx
import { useState } from "react";
import TeamMemberCard from "../../../components/TeamMemberCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800",
      name: "Rahul Mehta",
      position: "Founder & Trustee",
      bio: "Visionary leader with 15+ years of experience in social impact and rural development.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800",
      name: "Anita Sharma",
      position: "Program Director",
      bio: "Expert in education and women empowerment initiatives across India.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800",
      name: "Vikram Patel",
      position: "Operations Head",
      bio: "Ensures smooth execution of projects on the ground with strong community connections.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800",
      name: "Neha Joshi",
      position: "Communications Lead",
      bio: "Handles outreach, storytelling, and donor engagement for the foundation.",
    },
  ];

  /* ---------- Mobile Slider State ---------- */
  const [mobileIndex, setMobileIndex] = useState(0);

  const nextSlide = () => {
    setMobileIndex((prev) =>
      prev < teamMembers.length - 1 ? prev + 1 : prev
    );
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
