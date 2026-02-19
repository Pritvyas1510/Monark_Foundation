import { useState } from "react";
import { useDispatch } from "react-redux";
import { createImpactStory } from "../../Redux/slice/ImpactStory.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateImpact = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    articleUrl: "",
    peopleImpacted: "",
    availability: "",
  });

  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("published"); // published | draft

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload an image");

    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", image);
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
        articleUrl: "",
        peopleImpacted: "",
        availability: "",
      });
      setImage(null);
      setStatus("published");
      navigator("/impactstory")
    } catch {
      toast.error("Failed to create story");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-8">
          Create Impact Story
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

          <input
            name="subtitle"
            value={data.subtitle}
            placeholder="Subtitle"
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <textarea
            name="description"
            value={data.description}
            placeholder="Full Description"
            onChange={handleChange}
            rows="4"
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="articleUrl"
            value={data.articleUrl}
            placeholder="Article URL"
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="peopleImpacted"
              value={data.peopleImpacted}
              placeholder="People Impacted"
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="availability"
              value={data.availability}
              placeholder="Availability"
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />
          </div>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-4 py-3 font-medium"
          >
            <option value="published">Publish Now</option>
            <option value="draft">Save as Draft</option>
          </select>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg transition"
          >
            {status === "published" ? "Publish Story" : "Save Draft"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateImpact;
