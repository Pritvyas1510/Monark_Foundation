import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/slice/Event.slice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaImage,
  FaTimes,
  FaPlus,
  FaPhoneAlt,
  FaEnvelope,
  FaLink,
  FaVideo,
  FaHeading,
  FaTags,
  FaAlignLeft,
  FaGlobe,
  FaHome,
  FaUser,
  FaStar,
  FaFlagCheckered,
} from "react-icons/fa";

const EVENT_CATEGORIES = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Webinar",
  "Conference",
  "Hackathon",
  "Competition",
  "Exhibition",
  "Guest Lecture",
  "Orientation",
  "Alumni Meet",
  "Fest / Festival",
  "Placement Drive",
  "Club Activity",
  "Social Awareness",
  "Music / Dance",
  "Other",
];

const EVENT_TYPES = ["Online", "Offline", "Hybrid"];

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    eventType: "Offline",
    meetingLink: "",
    shortDescription: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    address: "",
    googleMapLink: "",
    organizedBy: "",
    contactPerson: "",
    contactNumber: "",
    contactEmail: "",
    status: "Draft",
  });

  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const isBannerVideo = banner?.type?.startsWith("video");

  const [gallery, setGallery] = useState([]); // File[]
  const [galleryPreviews, setGalleryPreviews] = useState([]); // string[]

  const [videos, setVideos] = useState([]); // File[]
  const [videoPreviews, setVideoPreviews] = useState([]); // string[]

  const [highlights, setHighlights] = useState([""]);
  const [customCategory, setCustomCategory] = useState("");

  /* -------- basic inputs -------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* -------- banner -------- */
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBanner(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const removeBanner = () => {
    setBanner(null);
    setBannerPreview(null);
  };

  /* -------- gallery (multiple) -------- */
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGallery((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeGalleryImage = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* -------- event videos (multiple, actual file upload) -------- */
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setVideos((prev) => [...prev, ...files]);
    setVideoPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* -------- dynamic list helpers (highlights / video urls) -------- */
  const updateListItem = (setter, index, value) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };
  const addListItem = (setter) => setter((prev) => [...prev, ""]);
  const removeListItem = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  /* -------- submit -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!banner) {
      toast.error("Please upload a banner image or video");
      return;
    }

    const finalCategory =
      formData.category === "Other" ? customCategory.trim() : formData.category;

    if (formData.category === "Other" && !finalCategory) {
      toast.error("Please enter a custom category");
      return;
    }

    if ((formData.eventType === "Online" || formData.eventType === "Hybrid") && !formData.meetingLink.trim()) {
      toast.error("Please add a Google Meet / Teams link for this event");
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "category") {
        fd.append("category", finalCategory);
      } else {
        fd.append(key, value);
      }
    });

    fd.append("bannerImage", banner);
    gallery.forEach((file) => fd.append("galleryImages", file));
    videos.forEach((file) => fd.append("videos", file));

    fd.append(
      "eventHighlights",
      JSON.stringify(highlights.map((h) => h.trim()).filter(Boolean))
    );

    try {
      setLoading(true);
      await dispatch(createEvent(fd)).unwrap();
      toast.success("Event created successfully");
      navigate("/eventhome");
    } catch (err) {
      toast.error(err || "Event creation failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition";
  const labelClass =
    "text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 border border-gray-100">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Organize New Event</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below carefully.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TITLE + CATEGORY + EVENT TYPE */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                <FaHeading className="text-orange-500" size={13} /> Event Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Annual Tech Fest 2026"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaTags className="text-orange-500" size={13} /> Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select category</option>
                {EVENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {formData.category === "Other" && (
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category"
                  className={inputClass + " mt-2"}
                />
              )}
            </div>
            <div>
              <label className={labelClass}>
                <FaGlobe className="text-orange-500" size={13} /> Event Type
              </label>
              <select
                name="eventType"
                required
                value={formData.eventType}
                onChange={handleChange}
                className={inputClass}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MEETING LINK — only for Online / Hybrid events */}
          {(formData.eventType === "Online" || formData.eventType === "Hybrid") && (
            <div>
              <label className={labelClass}>
                <FaVideo className="text-orange-500" size={13} /> Meeting Link
                (Google Meet / Teams)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="meetingLink"
                required
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="https://meet.google.com/xxx-xxxx-xxx or https://teams.microsoft.com/..."
                className={inputClass}
              />
            </div>
          )}

          {/* SHORT DESCRIPTION */}
          <div>
            <label className={labelClass}>
              <FaAlignLeft className="text-orange-500" size={13} /> Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="One-line summary shown on the event card"
              className={inputClass}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={labelClass}>
              <FaAlignLeft className="text-orange-500" size={13} /> Full Description
            </label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event in detail..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* DATE / START / END TIME */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                <FaCalendarAlt className="text-orange-500" size={13} /> Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaClock className="text-orange-500" size={13} /> Start Time
              </label>
              <input
                type="time"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaClock className="text-orange-500" size={13} /> End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* VENUE / ADDRESS / MAP LINK */}
          <div>
            <label className={labelClass}>
              <FaMapMarkerAlt className="text-orange-500" size={13} />{" "}
              {formData.eventType === "Online" ? "Venue (optional)" : "Venue"}
            </label>
            <input
              type="text"
              name="venue"
              required={formData.eventType !== "Online"}
              value={formData.venue}
              onChange={handleChange}
              placeholder={
                formData.eventType === "Online"
                  ? "e.g. Online (leave blank if not applicable)"
                  : "e.g. Monark University Auditorium"
              }
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <FaHome className="text-orange-500" size={13} /> Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full street address"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaLink className="text-orange-500" size={13} /> Google Map Link
              </label>
              <input
                type="url"
                name="googleMapLink"
                value={formData.googleMapLink}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
                className={inputClass}
              />
            </div>
          </div>

          {/* ORGANIZER */}
          <div>
            <label className={labelClass}>
              <FaUserTie className="text-orange-500" size={13} /> Organized By
            </label>
            <input
              type="text"
              name="organizedBy"
              required
              value={formData.organizedBy}
              onChange={handleChange}
              placeholder="e.g. Computer Engineering Department"
              className={inputClass}
            />
          </div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                <FaUser className="text-orange-500" size={12} /> Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaPhoneAlt className="text-orange-500" size={12} /> Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaEnvelope className="text-orange-500" size={12} /> Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* BANNER IMAGE / VIDEO */}
          <div>
            <label className={labelClass}>
              <FaImage className="text-orange-500" size={13} /> Banner Image /
              Video
              <span className="text-red-500">*</span>
            </label>

            {bannerPreview ? (
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 bg-black">
                {isBannerVideo ? (
                  <video
                    src={bannerPreview}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={removeBanner}
                  aria-label="Remove banner"
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full h-8 w-8 flex items-center justify-center shadow"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label
                htmlFor="banner-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-8 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition"
              >
                <FaImage className="text-gray-400 mb-2" size={22} />
                <span className="text-sm text-gray-500">
                  Click to upload the main banner (image or video)
                </span>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* GALLERY IMAGES */}
          <div>
            <label className={labelClass}>
              <FaImage className="text-orange-500" size={13} /> Gallery Images
              (optional)
            </label>

            <div className="grid grid-cols-4 gap-3 mb-3">
              {galleryPreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative h-24 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <label
              htmlFor="gallery-upload"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-3 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition text-sm text-gray-500"
            >
              <FaPlus size={12} /> Add gallery images
              <input
                id="gallery-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
            </label>
          </div>

          {/* HIGHLIGHTS */}
          <div>
            <label className={labelClass}>
              <FaStar className="text-orange-500" size={13} /> Event Highlights
              (optional)
            </label>
            <div className="space-y-2">
              {highlights.map((val, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) =>
                      updateListItem(setHighlights, i, e.target.value)
                    }
                    placeholder="e.g. Free entry for all students"
                    className={inputClass}
                  />
                  {highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem(setHighlights, i)}
                      className="px-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(setHighlights)}
                className="text-sm text-orange-600 font-medium flex items-center gap-1"
              >
                <FaPlus size={11} /> Add highlight
              </button>
            </div>
          </div>

          {/* EVENT VIDEOS */}
          <div>
            <label className={labelClass}>
              <FaVideo className="text-orange-500" size={13} /> Event Videos
              (optional)
            </label>

            <div className="grid grid-cols-2 gap-3 mb-3">
              {videoPreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative h-32 rounded-lg overflow-hidden border border-gray-200 bg-black"
                >
                  <video src={src} controls className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeVideo(i)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <label
              htmlFor="video-upload"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-3 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition text-sm text-gray-500"
            >
              <FaPlus size={12} /> Add event videos
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* STATUS */}
          <div>
            <label className={labelClass}>
              <FaFlagCheckered className="text-orange-500" size={13} /> Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white shadow-sm transition
    ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Events;