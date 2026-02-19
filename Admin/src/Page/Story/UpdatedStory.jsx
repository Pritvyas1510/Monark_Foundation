import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateStory, fetchStories } from "../../Redux/slice/Story.slice.js";
import toast from "react-hot-toast";

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

  /* ===============================
     FETCH IF NOT LOADED
  =============================== */
  useEffect(() => {
    if (!stories.length) {
      dispatch(fetchStories());
    }
  }, [dispatch, stories.length]);

  /* ===============================
     SET EXISTING DATA
  =============================== */
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

  /* ===============================
     INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ===============================
     MEDIA CHANGE
  =============================== */
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

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  if (!story)
    return <p className="text-center py-20 text-lg">Loading story...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Update Story
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-2xl p-6 space-y-5"
      >
        {/* PREVIEW */}
        {preview && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            {mediaType === "video" ? (
              <video
                src={preview}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            )}

            <button
              type="button"
              onClick={removeMedia}
              className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-8 h-8 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {!preview && (
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="border p-3 rounded-lg w-full"
          />
        )}

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-3 rounded-lg w-full"
          required
        />

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 rounded-lg w-full"
        />

        {/* ROLE */}
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          className="border p-3 rounded-lg w-full"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          placeholder="Description"
          className="border p-3 rounded-lg w-full"
          required
        />

        {/* PUBLISH TOGGLE */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          <span className="text-sm font-medium">
            Publish this story
          </span>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow w-full"
        >
          Update Story
        </button>
      </form>
    </div>
  );
};

export default UpdatedStory;
