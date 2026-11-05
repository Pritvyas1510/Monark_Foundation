import { useState } from "react";
import { useDispatch } from "react-redux";
import { createImpactStory } from "../../Redux/slice/ImpactStory.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaHeading,
  FaAlignLeft,
  FaVideo,
  FaUsers,
  FaRegCalendarCheck,
  FaImage,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";

const CreateImpact = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    peopleImpacted: "",
    availability: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [status, setStatus] = useState("published"); // published | draft
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoPreview(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload an image");
    if (!video) return toast.error("Please upload a video");

    setSubmitting(true);

    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", image);
    fd.append("video", video);
    fd.append("isPublished", status === "published");

    try {
      await dispatch(createImpactStory(fd)).unwrap();
      toast.success(
        status === "published"
          ? "Story published successfully"
          : "Story saved as draft"
      );

      setData({
        title: "",
        subtitle: "",
        description: "",
        peopleImpacted: "",
        availability: "",
      });
      setImage(null);
      setPreview(null);
      setVideo(null);
      setVideoPreview(null);
      setStatus("published");
      navigator("/impactstory");
    } catch {
      toast.error("Failed to create story");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Impact Story</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to publish a new story.
          </p>
        </div>

        <form
          onSubmit={submit}
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
                <video
                  src={videoPreview}
                  controls
                  className="w-full max-h-64"
                />
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
              value={data.title}
              onChange={handleChange}
              placeholder="e.g. From Classroom to Community"
              required
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
              value={data.subtitle}
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
              value={data.description}
              onChange={handleChange}
              rows="5"
              placeholder="Share the full story — the challenge, the support provided, and the outcome..."
              required
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
                value={data.peopleImpacted}
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
                value={data.availability}
                onChange={handleChange}
                placeholder="e.g. Ongoing / 2026"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaGlobe className="text-orange-500" size={13} /> Publish Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition bg-white"
            >
              <option value="published">Publish Now</option>
              <option value="draft">Save as Draft</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg shadow-sm transition"
          >
            {submitting
              ? "Saving..."
              : status === "published"
              ? "Publish Story"
              : "Save Draft"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateImpact;