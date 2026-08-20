import { useState } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../../Redux/slice/Story.slice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaHeading,
  FaUser,
  FaBriefcase,
  FaAlignLeft,
  FaImage,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";

const CreateStory = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [data, setData] = useState({
    title: "",
    name: "",
    role: "",
    description: "",
  });

  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mediaKind, setMediaKind] = useState(null); // "image" | "video"
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    setPreview(URL.createObjectURL(file));
    setMediaKind(file.type.startsWith("video") ? "video" : "image");
  };

  const removeMedia = () => {
    setMedia(null);
    setPreview(null);
    setMediaKind(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!media) return toast.error("Please upload image or video");

    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    fd.append("media", media);
    fd.append("isPublished", status === "published");

    try {
      setLoading(true);

      await dispatch(createStory(fd)).unwrap();

      toast.success(
        status === "published"
          ? "Story published successfully"
          : "Story saved as draft"
      );

      setData({
        title: "",
        name: "",
        role: "",
        description: "",
      });
      removeMedia();
      setStatus("published");

      navigator("/story");
    } catch {
      toast.error("Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Story</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to publish a new story.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-5 border border-gray-100"
        >
          {/* MEDIA */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaImage className="text-orange-500" size={13} /> Image or Video
            </label>

            {preview ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 bg-black">
                {mediaKind === "video" ? (
                  <video
                    src={preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Story preview"
                  />
                )}
                <button
                  type="button"
                  onClick={removeMedia}
                  aria-label="Remove media"
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full h-8 w-8 flex items-center justify-center shadow"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label
                htmlFor="story-media-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition"
              >
                <FaImage className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-500">
                  Click to upload an image or video
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  MP4, PNG or JPG
                </span>
                <input
                  id="story-media-upload"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaHeading className="text-orange-500" size={13} /> Story Title
            </label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="e.g. A Journey of Resilience"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <FaUser className="text-orange-500" size={13} /> Person Name
              </label>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <FaBriefcase className="text-orange-500" size={13} /> Role / Profession
              </label>
              <input
                name="role"
                value={data.role}
                onChange={handleChange}
                placeholder="e.g. Student, Volunteer"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaAlignLeft className="text-orange-500" size={13} /> Full Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows="5"
              placeholder="Share the full story in their own words..."
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
            />
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
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg shadow-sm transition flex justify-center items-center gap-2"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading
              ? "Publishing..."
              : status === "published"
              ? "Publish Story"
              : "Save Draft"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStory;