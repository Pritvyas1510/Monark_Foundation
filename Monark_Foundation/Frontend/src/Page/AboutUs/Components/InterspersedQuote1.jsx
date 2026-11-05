import { FaQuoteLeft } from "react-icons/fa";
import "../Style/index.css"

const InterspersedQuote1 = () => {
  return (
    <section className="relative bg-orange-50 py-24 px-6 overflow-hidden">

      {/* Soft decorative circle */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-orange-200/30 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fadeUp">

       
        <blockquote className="text-2xl md:text-4xl font-semibold italic text-gray-900 leading-relaxed">
          Monark Foundation didn’t just support our community 
          it empowered us with hope, dignity, and the belief that
          sustainable change is possible.
        </blockquote>

        <cite className="block mt-8 text-orange-500 font-bold not-italic uppercase tracking-widest text-sm">
          Community Beneficiary, Gujarat
        </cite>

      </div>
    </section>
  );
};

export default InterspersedQuote1;
