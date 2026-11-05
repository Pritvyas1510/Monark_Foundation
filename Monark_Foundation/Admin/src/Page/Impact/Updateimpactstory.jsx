import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateImpactStory, fetchImpactStories } from "../../Redux/slice/ImpactStory.slice";
import toast from "react-hot-toast";
import {
  FaHeading,
  FaAlignLeft,
  FaVideo,
  FaUsers,
  FaRegCalendarCheck,
  FaImage,
  FaTimes,
} from "react-icons/fa";

const Updatestory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stories } = useSelector((s) => s.impact);

  const story = stories.find((s) => s._id === id);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    peopleImpacted: "",
    availability: "",
  });

  const [preview, setPreview] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const [videoPreview, setVideoPreview] = useState(null);
  const [newVideo, setNewVideo] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!stories.length) dispatch(fetchImpactStories());
  }, [dispatch, stories.length]);

  useEffect(() => {
    if (story) {
      setForm({
        title: story.title,
        subtitle: story.subtitle || "",
        description: story.description,
        peopleImpacted: story.peopleImpacted || "",
        availability: story.availability || "",
      });
      setPreview(story.imageUrl);
      setVideoPreview(story.videoUrl);
    }
  }, [story]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);
    setNewImage(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {
    setVideoPreview(null);
    setNewVideo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (newImage) formData.append("image", newImage);
    if (newVideo) formData.append("video", newVideo);

    try {
      await dispatch(updateImpactStory({ id, formData })).unwrap();
      toast.success("Story updated successfully");
      navigate("/impactstory");
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!story) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        <p className="text-gray-500 text-sm">Loading story...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Update Impact Story</h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit the story details below and save your changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-5 border border-gray-100"
        >
          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaImage className="text-orange-500" size={13} /> Story Image
            </label>

            {preview ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="Story preview"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="Remove image"
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full h-8 w-8 flex items-center justify-center shadow"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label
                htmlFor="story-image-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition"
              >
                <FaImage className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-500">
                  Click to upload a story image
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  PNG or JPG, landscape works best
                </span>
                <input
                  id="story-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* VIDEO (replaces Article URL) */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaVideo className="text-orange-500" size={13} /> Story Video
            </label>

            {videoPreview ? (
              <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-black">
                <video src={videoPreview} controls className="w-full max-h-64" />
                <button
                  type="button"
                  onClick={removeVideo}
                  aria-label="Remove video"
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full h-8 w-8 flex items-center justify-center shadow"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label
                htmlFor="story-video-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition"
              >
                <FaVideo className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-500">
                  Click to upload the full story video
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  MP4 or WebM recommended
                </span>
                <input
                  id="story-video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaHeading className="text-orange-500" size={13} /> Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. From Classroom to Community"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="e.g. How one scholarship changed a family's future"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaAlignLeft className="text-orange-500" size={13} /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="Share the full story — the challenge, the support provided, and the outcome..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
            />
          </div>

          {/* People Impacted & Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <FaUsers className="text-orange-500" size={13} /> People Impacted
              </label>
              <input
                name="peopleImpacted"
                value={form.peopleImpacted}
                onChange={handleChange}
                placeholder="e.g. 250+"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <FaRegCalendarCheck className="text-orange-500" size={13} /> Availability
              </label>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                placeholder="e.g. Ongoing / 2026"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg shadow-sm transition"
          >
            {submitting ? "Updating..." : "Update Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatestory;