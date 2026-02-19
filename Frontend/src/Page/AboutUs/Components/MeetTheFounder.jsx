import { FaQuoteLeft, FaUserTie } from "react-icons/fa";
import "../Style/tera.css"

const MeetTheFounder = () => {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

      <div className="bg-orange-50 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-xl">

        {/* IMAGE */}
        <div className="lg:w-2/5 h-96 lg:h-auto animate-fadeRight overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCEPRjt3PBra6fKPysjFCNWe3Lyi2bci78Wz67StS-me1tEOtAJ0PzOvw9g5o0xXKhjf5dXK_L1f9zbhoJmpPTySfWX9pbAXWc8b9Eqvr22jss0Ir8-xoOb4JoEFwrOuZbbZEGAsPlKGWKzopkU2XbqVh8lThKV5UMXCPe85bcw4Zrf1dEEhVDiE45aCAJu2T1GCzaRbxQervOXcxxKwgU71S_eA-tZAolPjx8rkuP6YJKaVUAdnqPHWVExEO8XlxUGXgZYs3aP4l3"
            alt="Founder of Monark Foundation"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* CONTENT */}
        <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center space-y-8 animate-fadeLeft">

          <span className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm">
            <FaUserTie />
            A Message From Our Founder
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
      </div>
    </section>
  );
};

export default MeetTheFounder;
