import { FaMapMarkerAlt, FaArrowRight, FaPlayCircle, FaClock, FaCheckCircle } from "react-icons/fa";

// date arrives pre-formatted as "14-Aug-2026" — split it apart so the
// calendar badge can show the day big and the month/year small, like a
// ticket stub. Falls back to the raw string if the format ever changes.
const splitDate = (date) => {
  const parts = typeof date === "string" ? date.split("-") : [];
  if (parts.length === 3) {
    return { day: parts[0], month: parts[1], year: parts[2] };
  }
  return null;
};

const EventCard = ({
  date,
  venue,
  title,
  description,
  bannerImage,
  bannerType,
  organizedBy,
  status, // "upcoming" | "completed"
  onShowMore,
}) => {
  const isCompleted = status === "completed";
  const parsedDate = splitDate(date);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/20 hover:ring-orange-200">
      {/* Signature top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />

      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 sm:aspect-video">
        {bannerImage ? (
          bannerType === "video" ? (
            <div className="relative h-full w-full">
              <video
                src={bannerImage}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                <FaPlayCircle className="text-4xl text-white/90 drop-shadow-lg" />
              </div>
            </div>
          ) : (
            <img
              src={bannerImage}
              alt={title}
              className=" h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No media available
          </div>
        )}

        {/* Gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-sm ${
              isCompleted
                ? "bg-gray-900/75 text-white"
                : "bg-orange-500/95 text-white"
            }`}
          >
            {isCompleted ? <FaCheckCircle size={10} /> : <FaClock size={10} />}
            {isCompleted ? "Completed" : "Upcoming"}
          </span>
        </div>

        {/* Organizer badge */}
        {organizedBy && (
          <div className="absolute top-4 left-4 rounded-lg bg-white/95 px-3 py-1 shadow-md backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-500">
              {organizedBy}
            </p>
          </div>
        )}

        {/* Ticket-stub date badge, overlapping the media/content seam
        {parsedDate && (
          <div className="absolute -bottom-6 left-5 flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            <span className="text-lg font-black leading-none text-gray-900">
              {parsedDate.day}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-orange-500">
              {parsedDate.month}
            </span>
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 pt-9">
        {venue && (
          <div className="mb-2.5 flex items-center gap-1.5 text-orange-500">
            <FaMapMarkerAlt className="text-xs shrink-0" />
            <span className="truncate text-[11px] font-bold uppercase tracking-tight">
              {venue}
            </span>
          </div>
        )}

        <h3 className="mb-2 text-xl font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-orange-500 line-clamp-2">
          {title}
        </h3>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>

        {/* Footer: full date + Show More */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <span className="text-xs font-bold tracking-wide text-gray-400">
            {date}
          </span>

          <button
            type="button"
            onClick={() => onShowMore?.()}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-orange-500 hover:pr-3.5 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Show More
            <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;