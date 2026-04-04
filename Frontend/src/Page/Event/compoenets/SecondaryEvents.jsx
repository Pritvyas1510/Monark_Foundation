import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../Redux/slice/Events.slice.js";
import EventCard from "./EventCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

const SecondaryEvents = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const completedEvents = Array.isArray(events)
    ? events
        .filter((event) => new Date(`${event.date}T${event.time}`) < new Date())
        .sort(
          (a, b) =>
            new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`),
        )
    : [];

  const secondaryEvents = completedEvents;

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
            Past Events & Highlights
          </h2>

          <p className="text-gray-500 mt-2">
            Take a look at our previous initiatives and the impact we've created
            together.
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
        {secondaryEvents.map((event) => (
          <SwiperSlide key={event._id}>
            <EventCard
              date={new Date(event.date)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, "-")}
              location={event.location}
              title={event.title}
              organizedBy={event.organizedBy}
              description={event.description}
              mediaUrl={event.mediaUrl}
              mediaType={event.mediaType}
              buttonText="View Details"
              icon="event"
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
    </section>
  );
};

export default SecondaryEvents;
