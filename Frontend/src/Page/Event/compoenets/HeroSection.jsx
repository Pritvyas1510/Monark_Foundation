import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../Redux/slice/Events.slice";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaGlobe, FaCalendarAlt } from "react-icons/fa";
import "./HeroSection.css";

const SLIDE_INTERVAL = 60000;

/* Combine the schema's separate `date` (YYYY-MM-DD) and `startTime` (HH:mm)
   into one real Date object — using `date` alone treats every event as if
   it starts at midnight, which throws off both the "is this upcoming"
   filter and the countdown. */
const getEventDateTime = (event) => {
  if (!event?.date) return null;
  const datePart = event.date.slice(0, 10);
  const timePart =
    event.startTime && /^\d{2}:\d{2}/.test(event.startTime)
      ? event.startTime.slice(0, 5)
      : "00:00";
  const combined = new Date(`${datePart}T${timePart}:00`);
  if (!isNaN(combined.getTime())) return combined;
  const fallback = new Date(event.date);
  return isNaN(fallback.getTime()) ? null : fallback;
};

const formatShortDate = (dt) =>
  dt
    ? dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

// Pool every visual asset an event has — banner (image or video), gallery
// images, and any extra videos — so the hero isn't limited to whatever
// bannerType happens to be set to.
const buildMediaPool = (event) => {
  if (!event) return [];
  const pool = [];
  if (event.bannerImage) {
    pool.push({
      type: event.bannerType === "video" ? "video" : "image",
      src: event.bannerImage,
    });
  }
  (event.galleryImages || []).forEach((src) => pool.push({ type: "image", src }));
  (event.videoUrls || []).forEach((src) => pool.push({ type: "video", src }));
  return pool;
};

const HeroSection = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const now = new Date();

  const upcomingEvents = (events || [])
    .filter((event) => event.status === "Published")
    .map((event) => ({ event, eventDateTime: getEventDateTime(event) }))
    .filter(({ eventDateTime }) => eventDateTime && eventDateTime > now)
    .sort((a, b) => a.eventDateTime - b.eventDateTime)
    .map(({ event }) => event);

  const event = upcomingEvents[currentIndex];

  useEffect(() => {
    if (!upcomingEvents?.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % upcomingEvents.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingEvents.length]);

  // Every time the slide changes to a new event, randomly pick one asset
  // from its full media pool (banner image, banner video, gallery images,
  // extra videos) — so a video-and-photo event doesn't always show the
  // same one on repeat visits.
  useEffect(() => {
    const pool = buildMediaPool(event);
    if (!pool.length) {
      setActiveMedia(null);
      return;
    }
    setActiveMedia(pool[Math.floor(Math.random() * pool.length)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?._id]);

  if (loading) {
    return (
      <section className="min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#23170f] to-[#3a2416]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <h2 className="text-lg font-bold text-orange-400 tracking-wide">
            Loading upcoming events...
          </h2>
        </div>
      </section>
    );
  }

  if (!upcomingEvents?.length) {
    return (
      <section className="min-h-[560px] flex items-center justify-center bg-gradient-to-br from-[#23170f] via-[#2c1a10] to-[#3a2416] px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/30">
            <FaCalendarAlt className="text-orange-400 text-xl" />
          </div>
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Stay tuned
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-black mb-3 tracking-tight">
            No upcoming events right now
          </h2>
          <p className="text-white/60 leading-relaxed">
            We're planning our next initiative — check back soon or explore
            our past events below.
          </p>
        </div>
      </section>
    );
  }

  const eventDateTime = getEventDateTime(event);

  return (
    <section className="relative min-h-[700px] flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {activeMedia?.type === "video" ? (
          <video
            key={activeMedia.src}
            src={activeMedia.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover hero-kenburns"
          />
        ) : activeMedia?.src ? (
          <img
            key={activeMedia.src}
            src={activeMedia.src}
            alt={event.title}
            className="w-full h-full object-cover hero-kenburns"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#3a2416] to-[#23170f]" />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#23170f]/75 via-[#23170f]/45 to-[#23170f]/92" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* Content */}
      <div
        key={event._id}
        className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8 items-center animate-fadeSlide"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.25em]">
            {formatShortDate(eventDateTime)} · Next Up
          </p>
        </div>

        {/* Category / type / venue chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {event.category && (
            <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-bold uppercase tracking-wide shadow">
              {event.category}
            </span>
          )}
          {event.eventType && (
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-bold flex items-center gap-1.5">
              <FaGlobe size={10} /> {event.eventType}
            </span>
          )}
          {event.venue && (
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-bold flex items-center gap-1.5">
              <FaMapMarkerAlt size={10} /> {event.venue}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.05] tracking-[-0.03em] drop-shadow-sm">
            {event.title}
          </h1>

          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            {event.shortDescription || event.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/register">
            <button className="min-w-[200px] h-14 px-8 bg-[#ff6a00] text-white text-lg font-bold rounded-xl shadow-xl shadow-[#ff6a00]/30 hover:scale-105 hover:shadow-[#ff6a00]/50 transition-all">
              Join the Movement
            </button>
          </Link>

          {(event.eventType === "Online" || event.eventType === "Hybrid") &&
            event.meetingLink && (
              <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">
                <button className="min-w-[200px] h-14 px-8 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-colors">
                  Join Online
                </button>
              </a>
            )}
        </div>

        {/* Countdown — glass panel */}
        <div className="w-full max-w-3xl mt-4 flex flex-col items-center rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-md px-6 py-8 shadow-2xl shadow-black/20 sm:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-orange-500/50" />
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest">
              Event starts in
            </p>
            <span className="h-px w-8 bg-orange-500/50" />
          </div>

          <Countdown eventDate={eventDateTime} />
        </div>

        {/* Slide indicators — story-style progress bars, only when there's
            more than one upcoming event */}
        {upcomingEvents.length > 1 && (
          <div className="flex items-center gap-2 mt-2 w-full max-w-xs">
            {upcomingEvents.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Show event ${i + 1}`}
                className="h-1.5 flex-1 rounded-full bg-white/25 overflow-hidden"
              >
                {i === currentIndex ? (
                  <span
                    className="story-fill block h-full rounded-full bg-orange-500"
                    style={{ animationDuration: `${SLIDE_INTERVAL}ms` }}
                  />
                ) : i < currentIndex ? (
                  <span className="block h-full w-full rounded-full bg-orange-500/70" />
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;