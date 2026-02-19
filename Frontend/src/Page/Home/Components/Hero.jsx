import { useEffect, useState } from "react";
import { TbArrowIteration } from "react-icons/tb";
import "./Hero.css";

const videos = [
  "https://archive.org/download/monarkVideoSmllestFreeConvert/monarkVideoSmllestFreeConvert.mp4",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 6000); // change video every 6s

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full min-h-[100svh] md:min-h-[790px] flex items-center justify-center overflow-hidden -mt-26 md:my-0 ">
      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0">
        {videos.map((video, index) => (
          <video
            key={index}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full  h-[1050px] md:h-full object-cover md:scale-118  transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dark gradient overlay (tablet & desktop only) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        {/* Bottom fade (desktop only) */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
      </div>

      {/* 🔥 HERO CONTENT (UNCHANGED) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl flex flex-col gap-6 md:gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(244,140,37,0.8)]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              Empowering Education. Strengthening Communities. Creating Lasting
              Impact.
            </span>
          </div>

          <h1 className="text-4xl sm:text-4xl md:text-4xl font-black text-white leading-[1.1] tracking-tight">
            Building Stronger Communities,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
              Changing Lives for Tomorrow.
            </span>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-sm text-gray-200 text-justify leading-relaxed max-w-3xl font-medium tracking-wide">
              Monark Foundation is a mission-driven non-governmental
              organization committed to uplifting underprivileged communities
              through education, healthcare, and sustainable development. We
              focus on empowering children with quality learning opportunities
              while supporting families through humanitarian relief, poverty
              reduction, environmental initiatives, and community-based
              programs. Our goal is to create lasting impact transforming lives
              today and building a better tomorrow.
            </p>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl"></p>

          <div className="flex flex-wrap gap-4  -mt-10">
            <button className="h-14 px-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm cursor-pointer text-white border border-white/30 font-bold shadow-lg flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Watch Our Story
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
