import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateImpactStory, fetchImpactStories } from "../../Redux/slice/ImpactStory.slice";
import toast from "react-hot-toast";

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
    articleUrl: "",
    peopleImpacted: "",
    availability: "",
  });

  const [preview, setPreview] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (!stories.length) dispatch(fetchImpactStories());
  }, [dispatch, stories.length]);

  useEffect(() => {
    if (story) {
      setForm({
        title: story.title,
        subtitle: story.subtitle || "",
        description: story.description,
        articleUrl: story.articleUrl,
        peopleImpacted: story.peopleImpacted || "",
        availability: story.availability || "",
      });
      setPreview(story.imageUrl);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (newImage) formData.append("image", newImage);

    try {
      await dispatch(updateImpactStory({ id, formData })).unwrap();
      toast.success("Story updated successfully");
      navigate("/impactstory");
    } catch {
      toast.error("Update failed");
    }
  };

  if (!story) return <p className="text-center py-20">Loading story...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Update Impact Story</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-2xl p-6 space-y-5">

        {/* IMAGE */}
        {preview && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt="preview"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-8 h-8 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {!preview && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-3 rounded-lg w-full"
          />
        )}

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-3 rounded-lg w-full"
        />

        <input
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
          className="border p-3 rounded-lg w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          placeholder="Description"
          className="border p-3 rounded-lg w-full"
        />

        <input
          name="articleUrl"
          value={form.articleUrl}
          onChange={handleChange}
          placeholder="Article URL"
          className="border p-3 rounded-lg w-full"
        />

        <input
          name="peopleImpacted"
          value={form.peopleImpacted}
          onChange={handleChange}
          placeholder="People Impacted"
          className="border p-3 rounded-lg w-full"
        />

        <input
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Availability"
          className="border p-3 rounded-lg w-full"
        />

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

export default Updatestory;
