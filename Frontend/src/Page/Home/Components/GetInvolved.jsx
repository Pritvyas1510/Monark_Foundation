import {
  FaGraduationCap,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaUsers,
  FaLeaf,
} from "react-icons/fa";
import { useEffect, useRef } from "react";

const GetInvolved = () => {
  const focusAreas = [
    {
      icon: FaGraduationCap,
      title: "Education First",
      description:
        "Scholarships, school kits, digital learning initiatives, and mentorship programs designed to support students and promote quality education for all.",
      color: "orange",
    },
    {
      icon: FaHeartbeat,
      title: "Healthcare & Relief",
      description:
        "Free medical camps, disaster relief drives, and health awareness sessions aimed at improving community health and emergency response.",
      color: "blue",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Poverty Alleviation",
      description:
        "Food distribution, financial assistance, and livelihood support programs helping families achieve stability and self-reliance.",
      color: "green",
    },
    {
      icon: FaUsers,
      title: "Community Development",
      description:
        "Clean water projects, sanitation drives, and economic empowerment initiatives to build stronger and healthier communities.",
      color: "orange",
    },
    {
      icon: FaLeaf,
      title: "Environmental Sustainability",
      description:
        "Tree plantation drives, eco-awareness campaigns, and green initiatives focused on protecting and preserving the environment.",
      color: "green",
    },
  ];

  // Duplicate for infinite scroll
  const cards = [...focusAreas, ...focusAreas];
  const trackRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const speed = 0.3;

    const animate = () => {
      if (!trackRef.current) return;
      start -= speed;

      if (Math.abs(start) >= trackRef.current.scrollWidth / 2) {
        start = 0;
      }

      trackRef.current.style.transform = `translateX(${start}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="py-20 bg-orange-50 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">
          Our Focus Areas
        </h2>

        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Creating Impact Across Communities
        </h3>

        {/* MARQUEE SLIDER */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 w-max"
          >
            {cards.map((area, index) => {
              const Icon = area.icon;

              return (
                <div
                  key={index}
                  className="w-[320px] bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div
                    className={`size-16 mx-auto rounded-full flex items-center justify-center mb-6
                      ${
                        area.color === "orange" &&
                        "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                      }
                      ${
                        area.color === "blue" &&
                        "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                      }
                      ${
                        area.color === "green" &&
                        "bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white"
                      }
                      transition-colors`}
                  >
                    <Icon className="text-3xl" />
                  </div>

                  <h4 className="text-xl font-bold mb-3 text-gray-900 text-center">
                    {area.title}
                  </h4>

                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
