import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../Redux/slice/Events.slice.js";
import Countdown from "./Countdown";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const SLIDE_INTERVAL = 60000; // 1 minute

const HeroSection = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Upcoming Events Only
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

  const upcomingEvent = upcomingEvents[currentIndex];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-white">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -translate-x-12 -translate-y-12" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl translate-x-24 translate-y-24" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12 transition-all duration-700 ease-in-out">

        {/* LEFT */}
        <div
          key={upcomingEvent._id}
          className="flex flex-col gap-8 order-2 lg:order-1 animate-fadeSlide"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full w-fit">
            <span className="text-xs font-bold uppercase tracking-widest">
              {upcomingEvent.organizedBy}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
              {upcomingEvent.title}
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              {upcomingEvent.description}
            </p>
          </div>

          <Countdown eventDate={upcomingEvent.date} />

          <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/register">  <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all shadow-xl shadow-orange-300">
              Join the Movement
            </button>
            </Link>

            <button className="bg-white border-2 border-orange-200 hover:border-orange-500 px-10 py-5 rounded-xl text-lg font-bold transition-all text-orange-500">
              View Details
            </button>
          </div>
        </div>

        {/* RIGHT MEDIA */}
        <div className="relative order-1 lg:order-2 h-[400px] lg:h-[550px] animate-fadeSlide">
          <div className="absolute inset-0 bg-orange-100 rounded-3xl rotate-3 scale-105" />

          <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
            {upcomingEvent.mediaType === "image" ? (
              <img
                src={upcomingEvent.mediaUrl}
                alt={upcomingEvent.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              />
            ) : (
              <video
                src={upcomingEvent.mediaUrl}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                autoPlay
                muted
                loop
                playsInline
                key={upcomingEvent.mediaUrl}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-orange-400" />
                <span className="text-sm font-medium">
                  {upcomingEvent.location}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-orange-400" />
                <span className="text-sm font-medium">
                  {new Date(upcomingEvent.date).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default HeroSection;
