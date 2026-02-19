import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import "./EventNotifyed.css"

const EventNotifyed = () => {
  const { events = [] } = useSelector((state) => state.event);

  const [showBox, setShowBox] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  /* ===============================
     FIND NEAREST EVENT (within 3 days)
  =============================== */
  useEffect(() => {
    if (!events.length) return;

    const now = new Date();

    const upcoming = events
      .filter((event) => {
        const eventDate = new Date(event.date);
        const diff = eventDate - now;
        const threeDays = 3 * 24 * 60 * 60 * 1000;

        return diff > 0 && diff <= threeDays;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcoming.length > 0) {
      setShowBox(upcoming[0]);
    }
  }, [events]);

  /* ===============================
     COUNTDOWN TIMER
  =============================== */
  useEffect(() => {
    if (!showBox) return;

    const interval = setInterval(() => {
      const now = new Date();
      const eventDate = new Date(showBox.date);
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setShowBox(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      );
      const minutes = Math.floor(
        (diff / (1000 * 60)) % 60
      );
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [showBox]);

  /* ===============================
     SHOW AFTER SCROLL
  =============================== */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showBox || !visible || !timeLeft) return null;

  return (
  <div className="fixed top-24 right-6 z-50 animate-floatIn">
    <div className="bg-white shadow-xl border rounded-xl w-72 p-4 relative backdrop-blur">

      {/* CLOSE */}
      <button
        onClick={() => setShowBox(null)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
      >
        <X size={16} />
      </button>

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">⏳</span>
        <h3 className="font-bold text-orange-600 text-sm">
          Upcoming Event
        </h3>
      </div>

      <p className="text-sm font-semibold text-gray-800 leading-tight mb-3 line-clamp-2">
        {showBox.title}
      </p>

      {/* TIMER — horizontal compact */}
      <div className="flex justify-between text-center gap-2">

        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="flex-1 bg-orange-50 rounded-lg py-1.5 animate-pulseSoft"
          >
            <p className="text-base font-bold text-orange-600 leading-none">
              {value}
            </p>
            <span className="text-[10px] uppercase text-gray-500">
              {label}
            </span>
          </div>
        ))}

      </div>

      <p className="text-[11px] text-gray-400 mt-2 text-center">
        {new Date(showBox.date).toLocaleString()}
      </p>

    </div>
  </div>
);

};

export default EventNotifyed;
