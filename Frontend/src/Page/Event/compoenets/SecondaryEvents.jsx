import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../Redux/slice/Events.slice.js";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailModal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

/* Same combine logic as HeroSection — the schema stores `date` and
   `startTime` separately. The old code did `${event.date}T${event.time}`,
   but `event.time` doesn't exist on this schema, so it always produced an
   Invalid Date and silently filtered out every event. */
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

// A card counts as "completed" if it's explicitly marked Completed, or if
// it's Published but its date/time has already passed — covers admins who
// forget to flip the status manually once an event wraps.
const getStatus = (event, eventDateTime, now) => {
  if (event.status === "Completed") return "completed";
  if (eventDateTime && eventDateTime < now) return "completed";
  return "upcoming";
};

const SecondaryEvents = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  const swiperRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const now = new Date();

  // Show BOTH upcoming and completed events here — Published events that
  // haven't happened yet, plus anything wrapped up.
  const secondaryEvents = (Array.isArray(events) ? events : [])
    .filter((event) => event.status === "Published" || event.status === "Completed")
    .map((event) => {
      const eventDateTime = getEventDateTime(event);
      return {
        event,
        eventDateTime,
        status: getStatus(event, eventDateTime, now),
      };
    })
    .filter(({ eventDateTime }) => eventDateTime)
    // Most recent / soonest first
    .sort((a, b) => b.eventDateTime - a.eventDateTime);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-24 text-center">
        <p className="text-orange-500 font-bold">Loading events...</p>
      </section>
    );
  }

  if (!secondaryEvents.length) return null;

  return (
    <section className="max-w-7xl mx-auto py-24 bg-white px-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mb-14 text-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Events & Highlights
          </h2>

          <p className="text-gray-500 mt-2">
            Explore what's coming up and take a look at the impact we've
            already created together.
          </p>
        </div>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {secondaryEvents.map(({ event, status }) => (
          <SwiperSlide key={event._id} className="h-auto pb-2">
            <EventCard
              date={new Date(event.date)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, "-")}
              venue={event.venue}
              title={event.title}
              organizedBy={event.organizedBy}
              description={event.description}
              bannerImage={event.bannerImage}
              bannerType={event.bannerType}
              status={status}
              onShowMore={() => {
                setSelectedEvent(event);
                setSelectedStatus(status);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Slider Arrows */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => swiperRef.current.slidePrev()}
          className="w-10 h-10 flex items-center justify-center border border-orange-200 rounded-full text-orange-500 hover:bg-orange-500 hover:text-white transition"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => swiperRef.current.slideNext()}
          className="w-10 h-10 flex items-center justify-center border border-orange-500 rounded-full text-orange-500 hover:bg-orange-500 hover:text-white transition"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Detail modal */}
      <EventDetailModal
        event={selectedEvent}
        status={selectedStatus}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

export default SecondaryEvents;