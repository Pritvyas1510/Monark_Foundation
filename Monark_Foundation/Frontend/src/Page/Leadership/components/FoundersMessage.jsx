import monark_sir from "../../../../Public/Image/Monark_sir.jpeg";

const FoundersMessage = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white" id="founders-message">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
              <img
                src={monark_sir}
                alt="Founder Portrait"
                className="w-full h-[400px] sm:h-[480px] lg:h-[560px] object-cover rounded-xl shadow-xl transform transition hover:scale-105 duration-700 cursor-pointer"
              />

              {/* Badge */}
              <div className="absolute -bottom-5 right-3 sm:-bottom-6 sm:right-4 lg:-bottom-7 lg:-right-8 bg-[#ee8c2b] text-white px-5 sm:px-6 lg:px-8 py-2 rounded-lg shadow-lg">
                <p className="text-xs sm:text-sm text-center font-bold opacity-90">
                  Our Vision
                </p>
                <p className="text-base sm:text-lg font-extrabold text-center">
                  Better Tomorrow
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left ">
            <span className="text-[#ee8c2b] font-bold tracking-widest uppercase text-xs sm:text-sm">
              Founders Message
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 mb-6 leading-tight text-gray-900">
              Inspiring Change Through Education, Compassion & Service
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 italic  text-justify">
              "We believe that every individual has the potential to transform
              their life when given the right opportunities. At Monark
              Foundation, our mission is to empower communities through
              education, compassion, and meaningful social initiatives that
              create lasting impact."
            </p>

            <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed  text-justify">
              <p>
                Monark Foundation was established with a vision to build an
                inclusive society where every individual has access to quality
                education, skill development, and opportunities for personal
                growth. Our journey is driven by the belief that real change
                begins with empowering people and strengthening communities.
              </p>

              <p>
                Through educational programs, social welfare initiatives,
                environmental awareness, and community engagement, we strive to
                inspire hope, nurture talent, and create sustainable solutions
                for future generations. Every initiative reflects our commitment
                to serving society with integrity, compassion, and excellence.
              </p>

              <p>
                Our mission extends beyond providing support—we aim to create
                opportunities that enable individuals to become confident,
                self-reliant, and responsible contributors to society.
              </p>
            </div>

            <div className="mt-8 text-center lg:text-left">
              <p className="font-bold text-lg text-gray-900">Monark Goswami</p>
              <p className="text-[#ee8c2b] font-medium">
                Founder, Monark Foundation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersMessage;