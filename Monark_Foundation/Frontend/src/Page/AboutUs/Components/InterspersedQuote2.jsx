import { FaQuoteRight } from "react-icons/fa";

const InterspersedQuote2 = () => {
  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">

      {/* Soft glow accent */}
      <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-orange-200/40 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center border-y border-orange-200 py-16 animate-fadeUp">

      

        <blockquote className="text-2xl md:text-4xl font-semibold italic text-gray-900 leading-relaxed">
          Transparency builds trust, and trust builds stronger communities.
          Together, we don’t just give we grow lives with purpose.
        </blockquote>

        <p className="mt-6 text-orange-500 font-bold uppercase tracking-widest text-sm">
          Monark Foundation Philosophy
        </p>

      </div>
    </section>
  );
};

export default InterspersedQuote2;
