import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../Redux/slice/Events.slice.js";
import EventCard from "./EventCard";

const SecondaryEvents = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

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

  console.log("EVENTS:", events);
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
    <section className="max-w-7xl mx-auto py-24 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
  
  <div className="flex flex-col gap-2">
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
      Past Events & Highlights
    </h2>
    <p className="text-gray-500 max-w-md">
      Take a look at our previous initiatives and the impact we've created together.
    </p>
  </div>

  <span className="text-orange-500 font-semibold flex items-center gap-2">
    Event Archive
  </span>

</div>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {secondaryEvents.map((event) => (
          <EventCard
            key={event._id}
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
        ))}
      </div>
    </section>
  );
};

export default SecondaryEvents;
