import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../Redux/slice/Events.slice.js";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

const SLIDE_INTERVAL = 60000;

const HeroSection = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const upcomingEvents = events
    ?.filter((event) => new Date(event.date) > new Date())
    ?.sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    if (!upcomingEvents?.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % upcomingEvents.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [upcomingEvents]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Loading Upcoming Events...
        </h2>
      </section>
    );
  }

  if (!upcomingEvents?.length) return null;

  const event = upcomingEvents[currentIndex];

  return (
    <section className="relative min-h-[700px] flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">

      {/* Background Media */}
      <div className="absolute inset-0 z-0">

        {event.mediaType === "image" ? (
          <img
            src={event.mediaUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={event.mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#23170f]/60 via-[#23170f]/40 to-[#23170f]/80" />
      </div>

      {/* Content */}
      <div
        key={event._id}
        className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8 items-center animate-fadeSlide"
      >
        <div className="flex flex-col gap-6">

          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.03em] drop-shadow-sm">
            {event.title}
          </h1>

          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            {event.description}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">

          <Link to="/register">
            <button className="min-w-[200px] h-14 px-8 bg-[#ff6a00] text-white text-lg font-bold rounded-xl shadow-xl shadow-[#ff6a00]/30 hover:scale-105 transition-transform">
              Join the Movement
            </button>
          </Link>
        </div>

        {/* Countdown */}
       <div className="w-full max-w-3xl mt-12 flex flex-col items-center">
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-6">
            Campaign ends in
          </p>

          <Countdown eventDate={event.date} />

        </div>

      </div>

    </section>
  );
};

export default HeroSection;