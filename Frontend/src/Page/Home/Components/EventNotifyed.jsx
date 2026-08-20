import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X, Clock, MapPin, ArrowRight } from "lucide-react";
import { fetchEvents } from "../../../Redux/slice/Events.slice";
import "./EventNotifyed.css";

/* Combine the schema's separate `date` (YYYY-MM-DD) and `startTime` (HH:mm)
   strings into one real Date object. Using `event.date` alone ignores the
   time and treats every event as if it starts at midnight. */
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

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

const TIME_UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

const EventNotifyed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events = [] } = useSelector((state) => state.event);

  const [showBox, setShowBox] = useState(null);
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [progress, setProgress] = useState(0); // 0 -> 100, how close we are to the event

  /* FETCH EVENTS */
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  /* FIND NEAREST EVENT (within 3 days, Published only) */
  useEffect(() => {
    if (!events.length) return;

    const now = new Date();

    const upcoming = events
      .filter((event) => event.status === "Published")
      .map((event) => ({ event, eventDateTime: getEventDateTime(event) }))
      .filter(({ eventDateTime }) => {
        if (!eventDateTime) return false;
        const diff = eventDateTime - now;
        return diff > 0 && diff <= THREE_DAYS_MS;
      })
      .sort((a, b) => a.eventDateTime - b.eventDateTime);

    if (upcoming.length > 0) {
      setShowBox(upcoming[0].event);
    }
  }, [events]);

  /* COUNTDOWN TIMER + PROGRESS */
  useEffect(() => {
    if (!showBox) return;

    const eventDateTime = getEventDateTime(showBox);
    if (!eventDateTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDateTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setShowBox(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
      setProgress(Math.min(100, Math.max(0, (1 - diff / THREE_DAYS_MS) * 100)));
    }, 1000);

    return () => clearInterval(interval);
  }, [showBox]);

  /* SHOW AFTER SCROLL — adaptive to the page's actual scroll height */
  useEffect(() => {
    const getThreshold = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(810, scrollable * 0.2);
    };

    const handleScroll = () => setVisible(window.scrollY >= getThreshold());

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!showBox || !visible || !timeLeft) return null;

  const eventDateTime = getEventDateTime(showBox);
  const thumbnail =
    showBox.bannerType !== "video" && showBox.bannerImage
      ? showBox.bannerImage
      : showBox.galleryImages?.[0] || null;

  return (
    <div className="notify-wrapper fixed z-50 animate-floatIn">
      <div className="notify-card relative w-[19rem] sm:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
        {/* GRADIENT HEADER STRIP */}
        <div className="relative bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 px-4 pt-4 pb-8">
          <button
            onClick={() => setShowBox(null)}
            aria-label="Dismiss notification"
            className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition"
          >
            <X size={14} />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="notify-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/95">
              Happening soon
            </span>
          </div>

          <h3 className="text-white font-bold text-base leading-snug mt-2 line-clamp-2 pr-6">
            {showBox.title}
          </h3>

          {showBox.venue && (
            <div className="flex items-center gap-1.5 mt-1.5 text-white/90 text-xs">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{showBox.venue}</span>
            </div>
          )}
        </div>

     

        {/* BODY */}
        <div className={`px-4 pb-4 ${thumbnail ? "pt-9" : "pt-3"}`}>
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wide mb-2">
            <Clock size={11} />
            Starts in
          </div>

          {/* TIMER */}
          <div className="flex justify-between gap-1.5 mb-2">
            {TIME_UNITS.map(({ key, label }) => (
              <div
                key={key}
                className="flex-1 bg-orange-50 rounded-lg py-1.5 text-center animate-pulseSoft"
              >
                <p className="text-lg font-extrabold text-orange-600 leading-none tabular-nums">
                  {String(timeLeft[key]).padStart(2, "0")}
                </p>
                <span className="text-[9px] font-semibold uppercase text-gray-400 tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR — visual sense of how close the event is */}
          <div className="notify-progress-track mb-3">
            <div
              className="notify-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-gray-400">
              {eventDateTime?.toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            <button
              onClick={() => navigate("/event")}
              className="group inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition"
            >
              View
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventNotifyed;