import { FaSeedling, FaHandsHelping, FaChartLine } from "react-icons/fa";
import "../Style/index.css"

const HumbleBeginnings = () => {
  return (
    <section className="py-24 px-10 lg:px-12 max-w-8xl  bg-white overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 animate-fadeLeft">

          <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold tracking-widest uppercase">
            Our Journey
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            From a Small Vision to
            <br />
            <span className="text-orange-500">Community Transformation</span>
          </h2>

          <div className="w-20 h-1.5 bg-orange-500 rounded-full" />

          <p className="text-lg leading-relaxed text-gray-600">
            Monark Foundation began with a simple mission — to uplift rural
            communities by providing access to education, healthcare, and basic
            necessities. What started as a small initiative has grown into a
            movement impacting thousands of families across Gujarat.
          </p>

          {/* TIMELINE */}
          <div className="space-y-8 pt-6">

            <div className="flex gap-5 items-start">
              <FaSeedling className="text-orange-500 text-2xl shrink-0 animate-pulse" />
              <div>
                <h4 className="font-bold text-gray-900">Foundation Established</h4>
                <p className="text-sm text-gray-500">
                  Beginning grassroots efforts focused on child education and nutrition.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <FaHandsHelping className="text-orange-500 text-2xl shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Community Programs Launched</h4>
                <p className="text-sm text-gray-500">
                  Health camps, women empowerment workshops, and clean water drives.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <FaChartLine className="text-orange-500 text-2xl shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Growing Impact</h4>
                <p className="text-sm text-gray-500">
                  Reaching thousands of beneficiaries through sustainable initiatives.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative animate-fadeRight">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/10 rounded-2xl -z-10" />

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB-d0uk7-ZCq7h6aMxeNXus6zOtEHg0lCrCfnk-sJIuDkD9slNGTKYsjk9qko9QpUMSUAcl7gR9DrpTgST-myPzphVgYDKXYadwZmnB7jCfQeaskuqBo372Oaj5XlabTKcdf0BV5eGSF0OkQaBXHi693Xno5NURDbviXAOx8dyMUEF5Ccx1ZBfvDktg1SlnAXrg3RB-TsNI-cMK_ef_4m0AgAAGWhSfr1A-SpncZm7oE67yHcASbJlsk71_VZRf1YDwWtnWNRcUSvy"
            alt="Community development initiative"
            className="rounded-3xl shadow-2xl w-full h-[460px] md:h-[560px] object-cover hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute bottom-6 left-6 bg-orange-500 text-white px-6 py-4 rounded-xl shadow-xl">
            <span className="block text-3xl font-black">2015</span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-90">
              Founded
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumbleBeginnings;
