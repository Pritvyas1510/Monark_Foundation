import monark_sir from "../../../../Public/Image/Monark_sir.png";

const FoundersMessage = () => {
  return (
    <section className="py-5 bg-white" id="founders-message">
      <div className="container mx-auto px-2">
        <div className="flex flex-col lg:flex-row items-center">

          {/* LEFT IMAGE */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-[420px]">

              <img
                src={monark_sir}
                alt="Founder Portrait"
                className="w-full h-[560px] object-cover rounded-xl shadow-xl transform transition hover:scale-105 duration-700 cursor-pointer"
              />

              {/* Badge */}
              <div className="absolute -bottom-7 right-[-40px] bg-[#ee8c2b] text-white px-8 py-2 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">25+ Years</p>
                <p className="text-sm opacity-90">Humanitarian Service</p>
              </div>

            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="lg:w-1/2 w-full">

            <span className="text-[#ee8c2b] font-bold tracking-widest uppercase text-sm">
              Founders Message
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold mt-4 mb-6 leading-tight text-gray-900">
              Driving Change Through Compassion and Innovation
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6 italic">
              “We believe that every individual deserves the opportunity to
              thrive. Our work is not just about providing aid; it's about
              building resilient systems that empower people to lead their
              own destinies.”
            </p>

            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
              <p>
                Dr. Elena Vance founded Global Outreach with a single mission:
                to bridge the gap between resources and those who need them
                most. With a background in international development and public
                health, she has led initiatives impacting over 2 million lives
                across four continents.
              </p>

              <p>
                Her leadership style is rooted in transparency, local
                collaboration, and sustainable impact.
              </p>
            </div>

            <div className="mt-8">
              <p className="font-bold text-lg text-gray-900">
                Dr. Elena Vance
              </p>
              <p className="text-[#ee8c2b] font-medium">
                Founder & Executive Director
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersMessage;