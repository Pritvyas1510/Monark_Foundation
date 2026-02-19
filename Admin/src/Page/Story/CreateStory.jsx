import { useState } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../../Redux/slice/Story.slice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false); // 🔥 added

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!media) return toast.error("Please upload image or video");

    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    fd.append("media", media);
    fd.append("isPublished", status === "published");

    try {
      setLoading(true); // 🔥 start loader

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
      setMedia(null);
      setStatus("published");

      navigator("/story");
    } catch {
      toast.error("Failed to create story");
    } finally {
      setLoading(false); // 🔥 stop loader
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">
          Create Story
        </h2>

        <form onSubmit={submit} className="grid gap-5">

          <input
            name="title"
            value={data.title}
            placeholder="Story Title"
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={data.name}
              placeholder="Person Name"
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
              required
            />

            <input
              name="role"
              value={data.role}
              placeholder="Role / Profession"
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />
          </div>

          <textarea
            name="description"
            value={data.description}
            placeholder="Full Description"
            onChange={handleChange}
            rows="4"
            className="border rounded-lg px-4 py-3"
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-4 py-3 font-medium"
          >
            <option value="published">Publish Now</option>
            <option value="draft">Save as Draft</option>
          </select>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Image or Video
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
            />
          </div>

          {/* 🔥 LOADING BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg font-semibold text-lg transition flex justify-center items-center gap-2 ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
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
