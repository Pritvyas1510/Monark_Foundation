// src/components/CTASection.jsx
import { MdCalendarMonth } from "react-icons/md";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-orange-400">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 size-12 rounded-full bg-white/20 blur-xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Make a Difference Today
          </h2>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Your support can transform lives in rural Gujarat. Join thousands of generous donors
            who are helping us build a better future for children, families and communities.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Suggested donation amounts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <button className="py-3 px-4 rounded-lg border-2 border-white/30 text-white font-bold hover:bg-white hover:text-primary transition-colors">
                ₹500
              </button>
              <button className="py-3 px-4 rounded-lg border-2 border-white/30 text-white font-bold hover:bg-white hover:text-primary transition-colors">
                ₹1000
              </button>
              <button className="py-3 px-4 rounded-lg bg-white text-primary font-bold hover:bg-gray-100 transition-colors shadow-lg scale-105">
                ₹2500
              </button>
              <button className="py-3 px-4 rounded-lg border-2 border-white/30 text-white font-bold hover:bg-white hover:text-primary transition-colors">
                Other
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto min-w-[220px] h-14 bg-white text-primary hover:bg-gray-50 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Donate Monthly
                <span className="material-symbols-outlined text-sm"><MdCalendarMonth size={22} /></span>
              </button>

              <button className="w-full sm:w-auto min-w-[220px] h-14 bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg font-bold rounded-lg transition-all">
                One-Time Donation
              </button>
            </div>

            <p className="text-white/60 text-xs mt-6 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              Secure payment • 80G Tax Benefit • Instant Receipt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;