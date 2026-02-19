import { Link } from "react-router-dom";
import { FaHandsHelping, FaBullseye, FaUsers } from "react-icons/fa";

const AboutHero = () => {
  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT IMAGE */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl animate-fadeRight">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgbKAbEjINaCO2TsoE-HeQT4LfZSLjuMuc3HVWZABbBUYwVLTbWXDw9jeec6SY6XM6ivxqRYA4B14HoYU6pJc7ZJ_MmViFtOXizxR-iEaPK6AZ0P2ft80gUBVvY1ds4X-_pmyXIOA3qyWZVEmP1K-Clry-Bol2k37Y2wpGG35sWrY8ENmk7vfXsoLENgdNTMJJlEpiSS7d4dm8rGPBsjhYX3LVwJHSc9WCRFfxOxeE6AouPkqBZz307pWZcOQXpERbkqfvX6bHMK1V"
            alt="Community education initiative"
            className="w-full h-[420px] md:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-6 animate-fadeLeft">

          <span className="w-fit px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2">
            <FaHandsHelping />
            About Monark Foundation
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Creating Opportunities.
            <br />
            <span className="text-orange-500">Transforming Lives.</span>
          </h1>

          <p className="text-gray-600 leading-relaxed text-lg flex items-start gap-3">
            <FaBullseye className="text-orange-500 mt-1" />
            Monark Foundation is a non-profit organization dedicated to uplifting
            underserved communities through education, healthcare, sustainable
            development, and social empowerment programs across Gujarat.
          </p>

          <p className="text-gray-600 leading-relaxed flex items-start gap-3">
            <FaUsers className="text-orange-500 mt-1" />
            Since 2015, we have worked hand in hand with local communities to
            provide access to quality education, improve health awareness, and
            create long-term opportunities for families to thrive with dignity.
          </p>

          <div className="flex gap-4 pt-2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-orange-300 hover:scale-105">
              Our Mission
            </button>

            <Link to="/register">
              <button className="border-2 border-orange-300 hover:border-orange-500 text-orange-500 px-8 py-4 rounded-xl font-bold transition hover:scale-105">
                Join Us
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;
