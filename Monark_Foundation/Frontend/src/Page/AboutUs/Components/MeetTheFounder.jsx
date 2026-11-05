import { FaQuoteLeft, FaUserTie } from "react-icons/fa";
import Monark_Sir from "../../../../Public/Image/About_us_Monark_Sir.jpeg";
import "../Style/tera.css";

const MeetTheFounder = () => {
  return (
    <section className="py-24   px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="bg-orange-50 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-xl">
        {/* CONTENT */}
        <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center space-y-8 animate-fadeLeft">
          <span className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm">
            <FaUserTie />A Message From Our Founder
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Together We Can Transform Lives
          </h2>

          <div className="relative text-gray-700 text-lg leading-relaxed">
            <p className="pl-6">
              When we began Monark Foundation, our goal was simple — to serve
              communities with compassion, dignity, and sustainable solutions.
              Every child educated, every family supported, and every life
              improved strengthens our belief that real change starts at the
              grassroots level.
            </p>
          </div>

          <div className="pt-6">
            <p className="text-orange-500 font-serif italic text-4xl mb-1">
              Founder & Managing Trustee
            </p>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
              Monark Foundation
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="lg:w-2/5 flex items-center justify-center p-6">
          <div className="max-h-[520px] w-full overflow-hidden rounded-3xl">
            <img
              src={Monark_Sir}
              alt="Founder of Monark Foundation"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheFounder;
