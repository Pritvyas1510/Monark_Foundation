// src/components/MissionSection.jsx
import { useState, useEffect } from "react";
import {
  FaEye,
  FaHandshake,
  FaUsers,
  FaSchool,
  FaTint,
  FaHandsHelping,
  FaArrowRight,
} from "react-icons/fa";

const initiatives = [
  {
    title: "Education Support",
    description: "Scholarships, school kits & learning resources for children",
    icon: FaSchool,
    bg: "bg-primary text-white",
    special: true,
  },
  {
    title: "Poverty Upliftment",
    description: "Food aid, livelihood programs & family support initiatives",
    icon: FaHandsHelping,
    bg: "bg-white dark:bg-surface-dark text-text-main dark:text-black",
  },
  {
    title: "Environmental Care",
    description:
      "Tree plantation drives, waste awareness programs, and sustainability initiatives to protect our planet for future generations.",
    icon: FaHandsHelping,
    bg: "bg-white dark:bg-surface-dark text-text-main dark:text-black",
  },
  {
    title: "Community Care",
    description: "Healthcare camps, disaster relief & emergency assistance",
    icon: FaUsers,
    bg: "bg-white dark:bg-surface-dark text-text-main dark:text-black",
  },
];

const MissionSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide only on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initiatives.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Card component (used in both grid and slider)
  const InitiativeCard = ({ item, index }) => {
    const Icon = item.icon;
    const isSpecial = item.special;

    return (
      <div
        className={`
          p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5
          transform hover:-translate-y-2 transition-transform duration-300 group
          ${isSpecial ? item.bg : item.bg}
          ${isSpecial ? "" : "hover:shadow-xl"}
        `}
      >
        <Icon
          className={`
            text-4xl mb-4 
            ${isSpecial ? "opacity-80" : "text-primary group-hover:scale-110 transition-transform"}
          `}
        />
        <h3
          className={`
            text-3xl md:text-2xl font-black mb-1
            ${isSpecial ? "" : "text-text-main dark:text-black"}
          `}
        >
          {item.title}
        </h3>
        <p
          className={`
            font-medium md:text-[12px]
            ${isSpecial ? "opacity-90" : "text-text-main/60 dark:text-black"}
          `}
        >
          {item.description}
        </p>
      </div>
    );
  };

  return (
    <section className="py-24 min-h-screen bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column – Text content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Changing Lives One Child at a Time
              </span>
            </div>

            <h2 className="text-4xl md:text-2xl font-black text-text-main dark:text-white leading-tight mb-6">
              Every Child Deserves a Brighter Future.
              <br />
              <span className="text-primary">We Make It Possible.</span>
            </h2>

            <p className="text-sm text-text-main/70 dark:text-white/70 mb-8 leading-relaxed">
              Monark Foundation Works To Empower Children Through Education While
              Addressing Broader Social, Humanitarian, And Environmental
              Challenges. From Scholarships And School Kit Distribution To
              Disaster Relief, Healthcare, Clean Water Projects, And Poverty
              Alleviation, We Strive To Create Lasting Impact And Uplift
              Communities.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all">
                <div className="shrink-0 size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center text-xl">
                  <FaSchool />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-text-main dark:text-black">
                    Education & Scholarships
                  </h4>
                  <p className="text-[12px] text-text-main/60 dark:text-black">
                    Providing school kits, scholarships, and learning resources to
                    help underprivileged children access quality education.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all">
                <div className="shrink-0 size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center text-xl">
                  <FaTint />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-text-main dark:text-black">
                    Healthcare & Clean Water
                  </h4>
                  <p className="text-[10px] text-text-main/60 dark:text-black">
                    Supporting medical camps, health access, and clean drinking water
                    projects to improve well-being.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all">
                <div className="shrink-0 size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center text-xl">
                  <FaHandsHelping />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-text-main dark:text-black">
                    Disaster Relief & Poverty Support
                  </h4>
                  <p className="text-[10px] text-text-main/60 dark:text-black">
                    Delivering emergency aid, food support, and rehabilitation
                    programs to help families recover.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <a
                href="#"
                className="text-primary font-bold hover:text-primary-dark text-[12px] inline-flex items-center gap-2 group"
              >
                Read our full manifesto
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column – Cards / Slider */}
          <div className="lg:w-1/2 w-full">
            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <InitiativeCard item={initiatives[0]} />
                <InitiativeCard item={initiatives[1]} />
              </div>
              <div className="space-y-6">
                <InitiativeCard item={initiatives[2]} />
                <InitiativeCard item={initiatives[3]} />
              </div>
            </div>

            {/* Mobile Slider */}
            <div className="lg:hidden overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {initiatives.map((item, idx) => (
                  <div key={idx} className="min-w-full px-2">
                    <InitiativeCard item={item} />
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-6">
                {initiatives.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300
                      ${currentIndex === idx ? "bg-primary w-8" : "bg-gray-300"}
                    `}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;