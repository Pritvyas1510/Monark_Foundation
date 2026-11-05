import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  deleteEvent,
  updateEventStatus,
} from "../../Redux/slice/Event.slice.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaFilter,
  FaTimes,
  FaCalendarAlt,
  FaGlobe,
  FaImage,
  FaVideo,
  FaCheckCircle,
  FaFileAlt,
  FaBan,
  FaFlagCheckered,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import EventDetailModal from "./EventDetailModal.jsx";

const STATUS_STYLES = {
  Draft: "bg-gray-100 text-gray-600",
  Published: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

const STATUS_ICONS = {
  Draft: FaFileAlt,
  Published: FaCheckCircle,
  Cancelled: FaBan,
  Completed: FaFlagCheckered,
};

const STATUS_FILTERS = ["All", "Draft", "Published", "Cancelled", "Completed"];
const EVENT_TYPE_FILTERS = ["All", "Online", "Offline", "Hybrid"];

const EventHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state) => state.event);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Always resolve the modal's event from the live Redux list (by id) instead
  // of a stale snapshot, so status changes reflect immediately in the modal.
  const selectedEvent = useMemo(
    () => events.find((e) => e._id === selectedEventId) || null,
    [events, selectedEventId]
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const categoryOptions = useMemo(() => {
    const unique = new Set(events.map((e) => e.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesSearch =
        !q ||
        event.title?.toLowerCase().includes(q) ||
        event.organizedBy?.toLowerCase().includes(q) ||
        event.venue?.toLowerCase().includes(q) ||
        event.category?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "All" || event.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || event.category === categoryFilter;
      const matchesType = typeFilter === "All" || event.eventType === typeFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesType;
    });
  }, [events, search, statusFilter, categoryFilter, typeFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setTypeFilter("All");
  };

  const hasActiveFilters =
    search || statusFilter !== "All" || categoryFilter !== "All" || typeFilter !== "All";

  /* -------- actions -------- */
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvent(id)).unwrap();
      toast.success("Event deleted");
    } catch (err) {
      toast.error(err || "Failed to delete event");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateEventStatus({ id, status })).unwrap();
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error(err || "Failed to update status");
    }
  };

  const handleEdit = (id) => {
    navigate(`/eventupdate/${id}`);
  };

  /* -------- quick card actions (no need to open the modal) -------- */
  const handleCardEditClick = (e, id) => {
    e.stopPropagation();
    handleEdit(id);
  };

  const handleCardDeleteClick = (e, id) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const handleCardDeleteConfirm = async (e, id) => {
    e.stopPropagation();
    await handleDelete(id);
    setConfirmDeleteId(null);
  };

  const handleCardDeleteCancel = (e) => {
    e.stopPropagation();
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Events</h2>
          <p className="text-gray-500 text-sm">Manage and view all events</p>
        </div>

        <Link
          to="/event"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
        >
          <FaPlus size={13} /> Add Event
        </Link>
      </div>

      {/* SEARCH + FILTER TOGGLE */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, organizer, venue, category..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>

        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`px-4 py-2.5 rounded-lg border flex items-center gap-2 text-sm font-medium transition ${
            showFilters
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <FaFilter size={13} /> Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1.5"
          >
            <FaTimes size={12} /> Clear
          </button>
        )}
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
              Event Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            >
              {EVENT_TYPE_FILTERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* RESULT COUNT */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-3">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* EVENTS */}
      {loading ? (
        <p>Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          No events match your search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredEvents.map((event) => {
            const StatusIcon = STATUS_ICONS[event.status] || FaFileAlt;
            const isConfirmingDelete = confirmDeleteId === event._id;

            return (
              <div
                key={event._id}
                onClick={() => setSelectedEventId(event._id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer relative"
              >
                {/* BANNER */}
                <div className="relative w-full h-[220px] bg-black">
                  {event.bannerType === "video" ? (
                    <video
                      src={event.bannerImage}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={event.bannerImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {event.bannerType === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/50 rounded-full h-10 w-10 flex items-center justify-center text-white">
                        <FaVideo size={14} />
                      </span>
                    </span>
                  )}

                  {/* DATE BADGE */}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <FaCalendarAlt size={10} />
                    {new Date(event.date).toLocaleDateString("en-IN")}
                  </span>

                  {/* STATUS BADGE */}
                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full shadow font-medium flex items-center gap-1 ${
                      STATUS_STYLES[event.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <StatusIcon size={10} /> {event.status}
                  </span>

                  {/* QUICK EDIT / DELETE — appear on hover, sit on the banner */}
                  {!isConfirmingDelete && (
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => handleCardEditClick(e, event._id)}
                        aria-label="Edit event"
                        title="Edit event"
                        className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-blue-600 flex items-center justify-center shadow"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={(e) => handleCardDeleteClick(e, event._id)}
                        aria-label="Delete event"
                        title="Delete event"
                        className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  {/* CATEGORY + EVENT TYPE */}
                  <div className="flex items-center gap-2 mb-1">
                    {event.category && (
                      <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                        {event.category}
                      </span>
                    )}
                    {event.eventType && (
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                        <FaGlobe size={9} /> {event.eventType}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {event.title}
                  </h3>

                  {/* SHORT DESCRIPTION */}
                  {event.shortDescription && (
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {event.shortDescription}
                    </p>
                  )}

                  {/* ORGANIZER */}
                  <p className="text-sm text-gray-500 mb-3">
                    Organized by{" "}
                    <span className="font-semibold text-gray-700">
                      {event.organizedBy}
                    </span>
                  </p>

                  {/* MEDIA COUNTS */}
                  {(event.galleryImages?.length > 0 || event.videoUrls?.length > 0) && (
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      {event.galleryImages?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <FaImage size={11} /> {event.galleryImages.length}
                        </span>
                      )}
                      {event.videoUrls?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <FaVideo size={11} /> {event.videoUrls.length}
                        </span>
                      )}
                      <span className="ml-auto text-orange-500 font-medium">
                        View details →
                      </span>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    {isConfirmingDelete ? (
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-xs text-gray-500 flex-1">
                          Delete this event?
                        </span>
                        <button
                          onClick={handleCardDeleteCancel}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={(e) => handleCardDeleteConfirm(e, event._id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                        >
                          Yes, Delete
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCardEditClick(e, event._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        >
                          <FaEdit size={11} /> Edit
                        </button>
                        <button
                          onClick={(e) => handleCardDeleteClick(e, event._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <FaTrash size={11} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEventId(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default EventHome;