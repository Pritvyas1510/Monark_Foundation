// src/components/MissionSection.jsx
import {
  FaEye,
  FaHandshake,
  FaUsers,
  FaSchool,
  FaTint,
  FaHandsHelping,
  FaArrowRight,
} from "react-icons/fa";

const MissionSection = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">
                Our Mission
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight mb-6">
              More Than Just Charity. <br />
              <span className="text-primary">Sustainable Change.</span>
            </h2>

            <p className="text-lg text-text-main/70 dark:text-white/70 mb-8 leading-relaxed">
              We believe that everyone deserves a chance to thrive. Our foundation is dedicated to providing
              education, healthcare, and resources to underserved regions. Unlike traditional aid, we focus on
              building infrastructure that allows communities to grow independently.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all">
                <div className="shrink-0 size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center text-xl">
                  <FaEye />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-main dark:text-black">
                    100% Transparency
                  </h4>
                  <p className="text-sm text-text-main/60 dark:text-black">
                    Every dollar is tracked. We provide real-time updates on how your donation is being used.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all">
                <div className="shrink-0 size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary flex items-center justify-center text-xl">
                  <FaHandshake />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-main dark:text-black">
                    Community First
                  </h4>
                  <p className="text-sm text-text-main/60 dark:text-black">
                    We partner with local leaders to ensure our solutions are culturally appropriate and lasting.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="text-primary font-bold hover:text-primary-dark inline-flex items-center gap-2 group"
              >
                Read our full manifesto
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="space-y-6 mt-12">
                <div className="bg-primary text-white p-8 rounded-3xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                  <FaUsers className="text-4xl mb-4 opacity-80" />
                  <h3 className="text-5xl font-black mb-1">10k+</h3>
                  <p className="font-medium opacity-90">Lives Impacted</p>
                </div>

                <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 transform hover:-translate-y-2 transition-transform duration-300 group">
                  <FaSchool className="text-4xl mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-black text-text-main dark:text-black mb-1">50+</h3>
                  <p className="text-text-main/60 dark:text-black font-medium">
                    Schools Built
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 transform hover:-translate-y-2 transition-transform duration-300 group">
                  <FaTint className="text-4xl mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-black text-text-main dark:text-black mb-1">200</h3>
                  <p className="text-text-main/60 dark:text-black font-medium">
                    Wells Drilled
                  </p>
                </div>

                <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 transform hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FaHandsHelping className="text-8xl" />
                  </div>
                  <FaHandsHelping className="text-4xl mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-black text-text-main dark:text-black mb-1">500+</h3>
                  <p className="text-text-main/60 dark:text-black font-medium">
                    Active Volunteers
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
