import { FaHandsHelping, FaBullhorn, FaBuilding } from "react-icons/fa";
import { useEffect, useState } from "react";

const GetInvolved = () => {
  const ways = [
    {
      icon: FaHandsHelping,
      title: "Volunteer",
      description:
        "Join our team — work on-ground or remotely to support our projects.",
      action: "Join the team",
      color: "orange",
    },
    {
      icon: FaBullhorn,
      title: "Advocate",
      description:
        "Spread awareness, organize local events, and become our voice.",
      action: "Start a campaign",
      color: "blue",
    },
    {
      icon: FaBuilding,
      title: "Partner",
      description:
        "Collaborate with us for CSR projects, matching gifts or sponsorships.",
      action: "Partner with us",
      color: "green",
    },
  ];

  /* ---------- Mobile Slider State ---------- */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ---------- Auto Slide Every 5 Seconds ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ways.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ways.length]);

  return (
    <section className="py-20 bg-orange-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">
          Get Involved
        </h2>

        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          More Ways to Help
        </h3>

        {/* ================= Desktop Grid (UNCHANGED) ================= */}
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ways.map((way) => {
            const Icon = way.icon;

            return (
              <div
                key={way.title}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`size-16 mx-auto rounded-full flex items-center justify-center mb-6
                    ${
                      way.color === "orange" &&
                      "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                    }
                    ${
                      way.color === "blue" &&
                      "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                    }
                    ${
                      way.color === "green" &&
                      "bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white"
                    }
                    transition-colors`}
                >
                  <Icon className="text-3xl" />
                </div>

                <h4 className="text-xl font-bold mb-3 text-gray-900">
                  {way.title}
                </h4>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {way.description}
                </p>

                <span
                  className={`font-bold text-sm ${
                    way.color === "orange"
                      ? "text-orange-600"
                      : way.color === "blue"
                      ? "text-blue-600"
                      : "text-green-600"
                  } group-hover:underline`}
                >
                  {way.action}
                </span>
              </div>
            );
          })}
        </div>

        {/* ================= Mobile Auto Slider ================= */}
        <div className="md:hidden overflow-hidden max-w-sm mx-auto">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ways.map((way) => {
              const Icon = way.icon;

              return (
                <div key={way.title} className="min-w-full px-2">
                  <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <div
                      className={`size-16 mx-auto rounded-full flex items-center justify-center mb-6
                        ${
                          way.color === "orange" &&
                          "bg-orange-100 text-orange-600"
                        }
                        ${
                          way.color === "blue" &&
                          "bg-blue-100 text-blue-600"
                        }
                        ${
                          way.color === "green" &&
                          "bg-green-100 text-green-600"
                        }`}
                    >
                      <Icon className="text-3xl" />
                    </div>

                    <h4 className="text-xl font-bold mb-3 text-gray-900">
                      {way.title}
                    </h4>

                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {way.description}
                    </p>

                    <span
                      className={`font-bold text-sm ${
                        way.color === "orange"
                          ? "text-orange-600"
                          : way.color === "blue"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {way.action}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 my-6 ">
            {ways.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-orange-600 scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
