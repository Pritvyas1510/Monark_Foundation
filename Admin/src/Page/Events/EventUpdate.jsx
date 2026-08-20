import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventById,
  updateEvent,
  clearCurrentEvent,
} from "../../Redux/slice/Event.slice.js";
import toast from "react-hot-toast";
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

const toDateInput = (value) => {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const d = new Date(value);
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

const toTimeInput = (value) => {
  if (!value) return "";
  if (/^\d{2}:\d{2}/.test(value)) return value.slice(0, 5);
  const d = new Date(value);
  return isNaN(d.getTime()) ? "" : d.toTimeString().slice(0, 5);
};

const EventUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent, loading } = useSelector((state) => state.event);

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

  const [banner, setBanner] = useState(null); // new file (if replacing)
  const [bannerPreview, setBannerPreview] = useState(null); // new preview
  const [existingBanner, setExistingBanner] = useState(""); // current URL
  const [existingBannerType, setExistingBannerType] = useState("image");
  const isNewBannerVideo = banner?.type?.startsWith("video");

  const [existingGallery, setExistingGallery] = useState([]); // URLs kept
  const [newGallery, setNewGallery] = useState([]); // new File[]
  const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);

  const [existingVideos, setExistingVideos] = useState([]); // URLs kept
  const [newVideos, setNewVideos] = useState([]); // new File[]
  const [newVideoPreviews, setNewVideoPreviews] = useState([]);

  const [highlights, setHighlights] = useState([""]);
  const [customCategory, setCustomCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* FETCH EVENT */
  useEffect(() => {
    dispatch(fetchEventById(id));
    return () => dispatch(clearCurrentEvent());
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentEvent) return;

    const isKnownCategory = EVENT_CATEGORIES.includes(currentEvent.category);

    setFormData({
      title: currentEvent.title || "",
      category: isKnownCategory ? currentEvent.category : "Other",
      eventType: currentEvent.eventType || "Offline",
      meetingLink: currentEvent.meetingLink || "",
      shortDescription: currentEvent.shortDescription || "",
      description: currentEvent.description || "",
      date: toDateInput(currentEvent.date),
      startTime: toTimeInput(currentEvent.startTime),
      endTime: toTimeInput(currentEvent.endTime),
      venue: currentEvent.venue || "",
      address: currentEvent.address || "",
      googleMapLink: currentEvent.googleMapLink || "",
      organizedBy: currentEvent.organizedBy || "",
      contactPerson: currentEvent.contactPerson || "",
      contactNumber: currentEvent.contactNumber || "",
      contactEmail: currentEvent.contactEmail || "",
      status: currentEvent.status || "Draft",
    });

    if (!isKnownCategory) {
      setCustomCategory(currentEvent.category || "");
    }

    setExistingBanner(currentEvent.bannerImage || "");
    setExistingBannerType(currentEvent.bannerType || "image");
    setExistingGallery(currentEvent.galleryImages || []);
    setExistingVideos(currentEvent.videoUrls || []);
    setHighlights(
      currentEvent.eventHighlights?.length ? currentEvent.eventHighlights : [""]
    );
  }, [currentEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* BANNER */
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBanner(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  /* GALLERY */
  const removeExistingGalleryImage = (url) => {
    setExistingGallery((prev) => prev.filter((u) => u !== url));
  };

  const handleNewGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewGallery((prev) => [...prev, ...files]);
    setNewGalleryPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeNewGalleryImage = (index) => {
    setNewGallery((prev) => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* VIDEOS */
  const removeExistingVideo = (url) => {
    setExistingVideos((prev) => prev.filter((u) => u !== url));
  };

  const handleNewVideoChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewVideos((prev) => [...prev, ...files]);
    setNewVideoPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeNewVideo = (index) => {
    setNewVideos((prev) => prev.filter((_, i) => i !== index));
    setNewVideoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* HIGHLIGHTS / VIDEO URLS */
  const updateListItem = (setter, index, value) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };
  const addListItem = (setter) => setter((prev) => [...prev, ""]);
  const removeListItem = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory =
      formData.category === "Other" ? customCategory.trim() : formData.category;

    if (formData.category === "Other" && !finalCategory) {
      toast.error("Please enter a custom category");
      return;
    }

    if (
      (formData.eventType === "Online" || formData.eventType === "Hybrid") &&
      !formData.meetingLink.trim()
    ) {
      toast.error("Please add a Google Meet / Teams link for this event");
      return;
    }

    setSubmitting(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "category") {
        fd.append("category", finalCategory);
      } else {
        fd.append(key, value);
      }
    });

    if (banner) fd.append("bannerImage", banner);

    fd.append("existingGalleryImages", JSON.stringify(existingGallery));
    newGallery.forEach((file) => fd.append("galleryImages", file));

    fd.append("existingVideoUrls", JSON.stringify(existingVideos));
    newVideos.forEach((file) => fd.append("videos", file));

    fd.append(
      "eventHighlights",
      JSON.stringify(highlights.map((h) => h.trim()).filter(Boolean))
    );

    try {
      await dispatch(updateEvent({ id, formData: fd })).unwrap();
      toast.success("Event updated successfully");
      navigate("/eventhome");
    } catch (err) {
      toast.error(err || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition";
  const labelClass =
    "text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5";

  if (loading && !currentEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex justify-center items-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-gray-500 text-sm">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 border border-gray-100">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Update Event</h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit the details below and save your changes.
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
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <FaTags className="text-orange-500" size={13} /> Category
              </label>
              <select
                name="category"
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
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
              name="venue"
              required={formData.eventType !== "Online"}
              value={formData.venue}
              onChange={handleChange}
              placeholder={
                formData.eventType === "Online"
                  ? "e.g. Online (leave blank if not applicable)"
                  : ""
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
                name="address"
                value={formData.address}
                onChange={handleChange}
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
              name="organizedBy"
              value={formData.organizedBy}
              onChange={handleChange}
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
            </label>

            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 bg-black">
              {bannerPreview ? (
                isNewBannerVideo ? (
                  <video src={bannerPreview} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                )
              ) : existingBannerType === "video" ? (
                <video src={existingBanner} controls className="w-full h-full object-cover" />
              ) : (
                <img src={existingBanner} alt="Banner" className="w-full h-full object-cover" />
              )}
            </div>

            <label className="mt-2 inline-block text-sm text-orange-600 underline cursor-pointer">
              Replace banner (image or video)
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleBannerChange}
                className="hidden"
              />
            </label>
          </div>

          {/* GALLERY IMAGES */}
          <div>
            <label className={labelClass}>
              <FaImage className="text-orange-500" size={13} /> Gallery Images
            </label>

            <div className="grid grid-cols-4 gap-3 mb-3">
              {existingGallery.map((url) => (
                <div
                  key={url}
                  className="relative h-24 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryImage(url)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              {newGalleryPreviews.map((src, i) => (
                <div
                  key={`new-${i}`}
                  className="relative h-24 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img src={src} alt="New gallery" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewGalleryImage(i)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <label
              htmlFor="new-gallery-upload"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-3 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition text-sm text-gray-500"
            >
              <FaPlus size={12} /> Add gallery images
              <input
                id="new-gallery-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewGalleryChange}
                className="hidden"
              />
            </label>
          </div>

          {/* HIGHLIGHTS */}
          <div>
            <label className={labelClass}>
              <FaStar className="text-orange-500" size={13} /> Event Highlights
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
            </label>

            <div className="grid grid-cols-2 gap-3 mb-3">
              {existingVideos.map((url) => (
                <div
                  key={url}
                  className="relative h-32 rounded-lg overflow-hidden border border-gray-200 bg-black"
                >
                  <video src={url} controls className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingVideo(url)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              {newVideoPreviews.map((src, i) => (
                <div
                  key={`new-video-${i}`}
                  className="relative h-32 rounded-lg overflow-hidden border border-gray-200 bg-black"
                >
                  <video src={src} controls className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewVideo(i)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <label
              htmlFor="new-video-upload"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-3 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition text-sm text-gray-500"
            >
              <FaPlus size={12} /> Add event videos
              <input
                id="new-video-upload"
                type="file"
                accept="video/*"
                multiple
                onChange={handleNewVideoChange}
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

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2.5 rounded-lg transition shadow-sm"
          >
            {submitting ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventUpdate;