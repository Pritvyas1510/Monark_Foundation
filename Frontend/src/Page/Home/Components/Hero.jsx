import { TbArrowIteration } from "react-icons/tb";
// src/components/Hero.jsx
const Hero = () => {
  return (
    <header className="relative w-full min-h-[650px] flex items-center justify-center overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transform scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmr0HieVwPG6XX4vazZvcX8es9Sq8-KuM9TGmWZ5fb9oM3oTTXaSCj-Vw_ChIizDxTuXef8rYr7JIx2HhhBz9LL7UDEBM-CyHcM4tmOoQV7DUa3msb0DdEWes4k6vMbkqwkiQ7InAwsIoJNGJzXcqchyVdBnvuRNbNaR9s20FvWJphTm6xU1F9_hVsVkZGNsq9WHEw0Cci1yxehZmndI1gNwc3R-U9OCMS5jGWxzZhtERAT4Vyuguof_aZo0ncV1dAd-3oVM1dszw')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(244,140,37,0.8)]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Verified Non-Profit Organization
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-sm">
            Empowering Communities,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
              Igniting Hope.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl">
            We bridge the gap between resources and need. Join us in our mission to bring sustainable solutions,
            education, and healthcare to underserved regions worldwide.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <button className="h-14 px-8 rounded-lg bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Donate Now
              <span className="material-symbols-outlined"><TbArrowIteration size={32}/></span>
            </button>
            <button className="h-14 px-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 text-base font-bold shadow-lg transition-all flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Watch Our Story
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-white/80 text-sm font-medium">
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full bg-gray-300 border-2 border-black" />
              <div className="size-8 rounded-full bg-gray-400 border-2 border-black" />
              <div className="size-8 rounded-full bg-gray-500 border-2 border-black" />
              <div className="size-8 rounded-full bg-primary border-2 border-black flex items-center justify-center text-[10px] text-white font-bold">
                +2k
              </div>
            </div>
            <p>Donors joined this month</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;