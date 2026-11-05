import { FaHandHoldingHeart, FaChartPie, FaShieldAlt } from "react-icons/fa";
import "../Style/tera.css"

const Transparency = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 space-y-8 animate-fadeLeft">

            <span className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm">
              <FaShieldAlt />
              Transparency & Trust
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Every Contribution Makes a Difference
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              At Monark Foundation, we ensure every donation is responsibly
              managed and directly invested in community upliftment programs.
              Our commitment to transparency allows supporters to see the real
              impact of their generosity.
            </p>

            <div className="grid grid-cols-2 gap-8">

              <div className="p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500 shadow-sm">
                <span className="text-3xl font-black text-gray-900">88%</span>
                <p className="text-sm font-bold text-gray-500 uppercase">
                  Program Support
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-xl shadow-sm">
                <span className="text-3xl font-black text-gray-900">12%</span>
                <p className="text-sm font-bold text-gray-500 uppercase">
                  Operations
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT CHART */}
          <div className="lg:w-1/2 w-full animate-fadeRight">

            <div className="relative bg-orange-100/40 rounded-3xl p-12 flex items-center justify-center">

              <div className="relative size-64 flex items-center justify-center">

                <svg className="size-full -rotate-90" viewBox="0 0 256 256">
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="rgba(249,115,22,0.2)"
                    strokeWidth="22"
                    fill="transparent"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="#f97316"
                    strokeWidth="22"
                    fill="transparent"
                    strokeDasharray="628"
                    strokeDashoffset="75"
                    className="animate-progress"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <FaHandHoldingHeart className="text-orange-500 text-4xl mb-2" />
                  <span className="text-5xl font-black text-orange-500">
                    88%
                  </span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Direct Impact
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-white text-gray-800 p-4 rounded-lg shadow-xl space-y-2 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  Programs
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-orange-300" />
                  Operations
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transparency;
