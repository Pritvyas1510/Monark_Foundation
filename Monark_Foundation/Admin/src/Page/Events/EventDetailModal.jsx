import { useState } from "react";
import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaVideo,
  FaImage,
  FaCheckCircle,
  FaBan,
  FaFileAlt,
  FaFlagCheckered,
  FaStar,
  FaGlobe,
  FaExternalLinkAlt,
  FaCheck,
} from "react-icons/fa";

const STATUS_OPTIONS = [
  {
    value: "Draft",
    label: "Draft",
    icon: FaFileAlt,
    activeClass: "bg-gray-800 text-white border-gray-800 shadow-md shadow-gray-300",
  },
  {
    value: "Published",
    label: "Published",
    icon: FaCheckCircle,
    activeClass: "bg-green-600 text-white border-green-600 shadow-md shadow-green-200",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    icon: FaBan,
    activeClass: "bg-red-600 text-white border-red-600 shadow-md shadow-red-200",
  },
  {
    value: "Completed",
    label: "Completed",
    icon: FaFlagCheckered,
    activeClass: "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200",
  },
];

const EventDetailModal = ({ event, onClose, onEdit, onDelete, onStatusChange }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!event) return null;

  const handleStatusClick = async (status) => {
    if (status === event.status || updatingStatus) return;
    setUpdatingStatus(true);
    await onStatusChange(event._id, status);
    setUpdatingStatus(false);
  };

  const handleDeleteConfirm = async () => {
    await onDelete(event._id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BANNER */}
        <div className="relative w-full h-80 bg-black rounded-t-3xl overflow-hidden">
          {event.bannerType === "video" ? (
            <video
              src={event.bannerImage}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* gradient overlay for title legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* CLOSE */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full h-10 w-10 flex items-center justify-center shadow transition"
          >
            <FaTimes />
          </button>

          {/* STATUS BADGE on banner */}
          <span
            className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border ${
              STATUS_OPTIONS.find((s) => s.value === event.status)?.activeClass ||
              "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {event.status}
          </span>

          {/* TITLE overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {event.category && (
                <span className="text-xs font-semibold text-white bg-orange-500 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {event.category}
                </span>
              )}
              {event.eventType && (
                <span className="text-xs font-semibold text-white bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <FaGlobe size={10} /> {event.eventType}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow">{event.title}</h2>
            {event.shortDescription && (
              <p className="text-gray-200 mt-1">{event.shortDescription}</p>
            )}
          </div>
        </div>

        <div className="p-6 space-y-7">
          {/* STATUS CONTROLS */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
              <FaFlagCheckered className="text-orange-500" size={13} /> Update Status
            </label>
            <div className="flex flex-wrap gap-2.5">
              {STATUS_OPTIONS.map(({ value, label, icon: Icon, activeClass }) => {
                const isActive = event.status === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleStatusClick(value)}
                    className={`text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all border-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isActive
                        ? `${activeClass} scale-105`
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {isActive ? <FaCheck size={11} /> : <Icon size={11} />}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DATE / TIME / VENUE / MEETING LINK */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2.5">
              <FaCalendarAlt className="text-orange-500" />
              <span>{new Date(event.date).toLocaleDateString("en-IN")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FaClock className="text-orange-500" />
              <span>
                {event.startTime}
                {event.endTime ? ` – ${event.endTime}` : ""}
              </span>
            </div>
            {event.venue && (
              <div className="flex items-center gap-2.5 col-span-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>{event.venue}</span>
                {event.googleMapLink && (
                  <a
                    href={event.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                  >
                    Map <FaExternalLinkAlt size={9} />
                  </a>
                )}
              </div>
            )}
            {event.meetingLink && (
              <div className="flex items-center gap-2.5 col-span-2">
                <FaVideo className="text-orange-500" />
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Join meeting <FaExternalLinkAlt size={10} />
                </a>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          {event.description && (
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <FaFileAlt className="text-orange-500" size={13} /> About
              </label>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}

          {/* HIGHLIGHTS */}
          {event.eventHighlights?.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <FaStar className="text-orange-500" size={13} /> Highlights
              </label>
              <ul className="space-y-1.5">
                {event.eventHighlights.map((h, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ORGANIZER + CONTACT */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <FaUserTie className="text-orange-500" size={13} /> Organized By
            </label>
            <p className="text-sm text-gray-800 font-medium mb-2">{event.organizedBy}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {event.contactPerson && <span>{event.contactPerson}</span>}
              {event.contactNumber && (
                <span className="flex items-center gap-1.5">
                  <FaPhoneAlt className="text-orange-400" size={11} /> {event.contactNumber}
                </span>
              )}
              {event.contactEmail && (
                <span className="flex items-center gap-1.5">
                  <FaEnvelope className="text-orange-400" size={11} /> {event.contactEmail}
                </span>
              )}
            </div>
          </div>

          {/* GALLERY */}
          {event.galleryImages?.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <FaImage className="text-orange-500" size={13} /> Gallery ({event.galleryImages.length})
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {event.galleryImages.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-32 rounded-xl overflow-hidden border border-gray-200"
                  >
                    <img
                      src={url}
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* EVENT VIDEOS — enlarged, single column so each video is clearly watchable */}
          {event.videoUrls?.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <FaVideo className="text-orange-500" size={13} /> Videos ({event.videoUrls.length})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.videoUrls.map((url, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-gray-200 bg-black aspect-video"
                  >
                    <video src={url} controls className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            {!confirmingDelete ? (
              <>
                <button
                  onClick={() => onEdit(event._id)}
                  className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl text-sm font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2"
                >
                  <FaEdit /> Edit Event
                </button>
                <button
                  onClick={() => setConfirmingDelete(true)}
                  className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl text-sm font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                  <FaTrash /> Delete Event
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-gray-600 flex items-center">
                  Delete this event permanently?
                </span>
                <button
                  onClick={() => setConfirmingDelete(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-3 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;