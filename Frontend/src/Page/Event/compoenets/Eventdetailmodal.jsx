import { useEffect, useState } from "react";
import "./Eventdetailmodal .css";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaPlayCircle,
  FaCheckCircle,
} from "react-icons/fa";
import Logo from "../../../../Public/Image/Logo.png";

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (time24) => {
  if (!time24 || !/^\d{2}:\d{2}/.test(time24)) return null;
  const [h, m] = time24.slice(0, 5).split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

const EventDetailModal = ({ event, status, onClose }) => {
  // Build a single media list: banner first, then gallery images, then videos
  const mediaList = event
    ? [
        event.bannerImage && {
          type: event.bannerType === "video" ? "video" : "image",
          src: event.bannerImage,
        },
        ...(event.galleryImages || []).map((src) => ({ type: "image", src })),
        ...(event.videoUrls || []).map((src) => ({ type: "video", src })),
      ].filter(Boolean)
    : [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [event?._id]);

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (!event) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [event, onClose]);

  if (!event) return null;

  const isCompleted = status === "completed";
  const activeMedia = mediaList[activeIndex];
  const startTime = formatTime(event.startTime);
  const endTime = formatTime(event.endTime);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-modalIn"
      >
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gray-100 bg-white px-5 py-3 sm:px-7">
          {/* Logo — centered, matches the site header */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <img src={Logo} alt="Organization logo" className="h-9 w-auto object-contain sm:h-10" />
            <p className="text-orange-600 font-bold ">Monark Foundation</p>
          </div>

          {event.category && (
            <span className="hidden shrink-0 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-600 sm:inline-block">
              {event.category}
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-orange-500 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">
          {/* Main media — object-contain so nothing gets cropped, whatever the
              banner/gallery asset's original aspect ratio is */}
          <div className="relative flex aspect-video w-full items-center justify-center bg-gray-900">
            {activeMedia ? (
              activeMedia.type === "video" ? (
                <video
                  key={activeMedia.src}
                  src={activeMedia.src}
                  className="h-full w-full object-contain"
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  playsInline
                />
              ) : (
                <img
                  key={activeMedia.src}
                  src={activeMedia.src}
                  alt={event.title}
                  className="h-full w-full object-contain"
                />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No media available
              </div>
            )}

            <span
              className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${
                isCompleted ? "bg-gray-900/85 text-white" : "bg-orange-500 text-white"
              }`}
            >
              {isCompleted ? "Completed" : "Upcoming"}
            </span>
          </div>

          {/* Thumbnail strip */}
          {mediaList.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-b border-gray-100 bg-gray-50 px-5 py-3 sm:px-7">
              {mediaList.map((m, i) => (
                <button
                  key={`${m.src}-${i}`}
                  onClick={() => setActiveIndex(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    i === activeIndex
                      ? "border-orange-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {m.type === "video" ? (
                    <>
                      <video src={m.src} className="h-full w-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <FaPlayCircle className="text-white text-lg" />
                      </div>
                    </>
                  ) : (
                    <img src={m.src} alt="" className="h-full w-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="px-5 py-6 sm:px-7">
            {/* Chips */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {event.eventType && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                  <FaGlobe size={10} /> {event.eventType}
                </span>
              )}
              {event.venue && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                  <FaMapMarkerAlt size={10} /> {event.venue}
                </span>
              )}
            </div>

            <h2 className="mb-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
              {event.title}
            </h2>

            <p className="mb-6 leading-relaxed text-gray-600">
              {event.description || event.shortDescription}
            </p>

            {/* Key info grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl bg-gray-50 p-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <FaCalendarAlt className="mt-0.5 shrink-0 text-orange-500" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              {startTime && (
                <div className="flex items-start gap-3">
                  <FaClock className="mt-0.5 shrink-0 text-orange-500" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Time
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {startTime}
                      {endTime ? ` – ${endTime}` : ""}
                    </p>
                  </div>
                </div>
              )}

              {event.venue && (
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-0.5 shrink-0 text-orange-500" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Venue
                    </p>
                    <p className="text-sm font-semibold text-gray-800">{event.venue}</p>
                    {event.address && (
                      <p className="text-xs text-gray-500">{event.address}</p>
                    )}
                    {event.googleMapLink && (
                      <a
                        href={event.googleMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:underline"
                      >
                        Get directions <FaExternalLinkAlt size={9} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {event.contactPerson && (
                <div className="flex items-start gap-3">
                  <FaUserAlt className="mt-0.5 shrink-0 text-orange-500" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Contact
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {event.contactPerson}
                    </p>
                    {event.contactNumber && (
                      <a
                        href={`tel:${event.contactNumber}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500"
                      >
                        <FaPhoneAlt size={9} /> {event.contactNumber}
                      </a>
                    )}
                    {event.contactEmail && (
                      <a
                        href={`mailto:${event.contactEmail}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500"
                      >
                        <FaEnvelope size={9} /> {event.contactEmail}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Highlights */}
            {event.eventHighlights?.length > 0 && (
              <div className="mb-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Highlights
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {event.eventHighlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <FaCheckCircle className="mt-0.5 shrink-0 text-orange-500" size={12} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        {!isCompleted && (
          <div className="flex flex-wrap gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
            <a href="/register" className="flex-1 min-w-[160px]">
              <button className="h-12 w-full rounded-xl bg-[#ff6a00] text-sm font-bold text-white shadow-lg shadow-[#ff6a00]/30 transition-transform hover:scale-[1.02]">
                Join the Movement
              </button>
            </a>
            {(event.eventType === "Online" || event.eventType === "Hybrid") &&
              event.meetingLink && (
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px]"
                >
                  <button className="h-12 w-full rounded-xl border-2 border-orange-500 text-sm font-bold text-orange-500 transition-colors hover:bg-orange-500 hover:text-white">
                    Join Online
                  </button>
                </a>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailModal;