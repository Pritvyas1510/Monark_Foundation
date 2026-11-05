import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateStory, fetchStories } from "../../Redux/slice/Story.slice.js";
import toast from "react-hot-toast";
import {
  FaHeading,
  FaUser,
  FaBriefcase,
  FaAlignLeft,
  FaImage,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";

const UpdatedStory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stories = [] } = useSelector((s) => s.story);

  const story = stories.find((s) => s._id === id);

  const [form, setForm] = useState({
    title: "",
    name: "",
    role: "",
    description: "",
    isPublished: false,
  });

  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [newMedia, setNewMedia] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  /* FETCH IF NOT LOADED */
  useEffect(() => {
    if (!stories.length) {
      dispatch(fetchStories());
    }
  }, [dispatch, stories.length]);

  /* SET EXISTING DATA */
  useEffect(() => {
    if (story) {
      setForm({
        title: story.title,
        name: story.name || "",
        role: story.role || "",
        description: story.description,
        isPublished: story.isPublished,
      });

      setPreview(story.mediaUrl);
      setMediaType(story.mediaType);
    }
  }, [story]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewMedia(file);
    setPreview(URL.createObjectURL(file));
    setMediaType(file.type.startsWith("video") ? "video" : "image");
  };

  const removeMedia = () => {
    setPreview(null);
    setNewMedia(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (newMedia) formData.append("media", newMedia);

    try {
      await dispatch(updateStory({ id, formData })).unwrap();
      toast.success("Story updated successfully");
      navigate("/story");
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
          <h2 className="text-2xl font-bold text-gray-900">Update Story</h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit the story details below and save your changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-5 border border-gray-100"
        >
          {/* MEDIA */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaImage className="text-orange-500" size={13} /> Image or Video
            </label>

            {preview ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 bg-black">
                {mediaType === "video" ? (
                  <video
                    src={preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Story preview"
                    className="w-full h-full object-cover"
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
              value={form.title}
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
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <FaBriefcase className="text-orange-500" size={13} /> Role / Profession
              </label>
              <input
                name="role"
                value={form.role}
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
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="Share the full story in their own words..."
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
            />
          </div>

          {/* PUBLISH TOGGLE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaGlobe className="text-orange-500" size={13} /> Publish Status
            </label>
            <label
              htmlFor="isPublished"
              className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2.5 cursor-pointer hover:border-orange-300 transition"
            >
              <span className="text-sm text-gray-700">
                {form.isPublished
                  ? "Story is live and visible on the site"
                  : "Story is saved as a draft"}
              </span>
              <input
                id="isPublished"
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="h-5 w-5 accent-orange-500 cursor-pointer"
              />
            </label>
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

export default UpdatedStory;