// src/components/TrustedPartners.jsx
import {
  FaGlobe,
  FaTint,
  FaHeartbeat,
  FaSchool,
  FaLeaf,
} from "react-icons/fa";

const TrustedPartners = () => {
  const partners = [
    { icon: <FaGlobe />, name: "Global", colored: "Aid", color: "text-orange-600" },
    { icon: <FaTint />, name: "Pure", colored: "Water", color: "text-blue-500" },
    { icon: <FaHeartbeat />, name: "Medi", colored: "Care", color: "text-red-500" },
    { icon: <FaSchool />, name: "Edu", colored: "Future", color: "text-yellow-500" },
    { icon: <FaLeaf />, name: "Green", colored: "Earth", color: "text-green-500" },
  ];

  return (
    <section className="relative py-16 bg-white border-b border-[#f4ede7] overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-base md:text-lg font-bold text-gray-400 uppercase tracking-widest">
          Trusted by Global Partners
        </p>
      </div>

      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

      {/* ================= Desktop View (UNCHANGED) ================= */}
      <div className="hidden md:flex justify-center gap-16 md:gap-28 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
        {partners.map((partner, idx) => (
          <div key={idx} className="flex items-center gap-4 cursor-pointer">
            <div className={`text-5xl md:text-6xl ${partner.color}`}>
              {partner.icon}
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-[#1c140d]">
              {partner.name}
              <span className={`ml-1 ${partner.color}`}>
                {partner.colored}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* ================= Mobile Marquee (2 items visible) ================= */}
      <div className="md:hidden relative overflow-hidden">
        <div className="flex gap-8 animate-partner-marquee">
          {[...partners, ...partners].map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 min-w-[50%] justify-center opacity-80"
            >
              <div className={`text-5xl ${partner.color}`}>
                {partner.icon}
              </div>
              <span className="text-2xl font-extrabold text-[#1c140d]">
                {partner.name}
                <span className={`ml-1 ${partner.color}`}>
                  {partner.colored}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes partner-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-partner-marquee {
            animation: partner-marquee 18s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default TrustedPartners;
