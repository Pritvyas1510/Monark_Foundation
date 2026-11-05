import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImpactStories,
  togglePublishStory,
  deleteImpactStory,
} from "../../Redux/slice/ImpactStory.slice";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";

const ImpactStories = () => {
  const dispatch = useDispatch();
  const { stories = [], loading } = useSelector((s) => s.impact);

  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // ✅ for modal

  useEffect(() => {
    dispatch(fetchImpactStories());
  }, [dispatch]);

  const filteredStories = stories.filter((story) => {
    if (filter === "published") return story.isPublished;
    if (filter === "draft") return !story.isPublished;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-lg font-semibold">
        Loading stories...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Impact Stories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all impact stories
          </p>
        </div>

        <div className="flex gap-3 md:ml-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-400 outline-none bg-white"
          >
            <option value="all">All Stories</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <Link to="/createimpactstory">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm transition">
              <FaPlus size={12} /> Add Story
            </button>
          </Link>
        </div>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStories.map((story) => {
          const isExpanded = expandedId === story._id;
          const shortText = story.description.slice(0, 120);

          return (
            <div
              key={story._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
            >
              {/* IMAGE */}
              <div className="relative h-48">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />

                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
                    story.isPublished
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800/90 text-white"
                  }`}
                >
                  {story.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {story.title}
                </h3>

                <p className="text-xs text-gray-500 mb-3">
                  Status:{" "}
                  <span className="font-semibold text-gray-700">
                    {story.isPublished ? "Live on site" : "Not published"}
                  </span>
                </p>

                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {isExpanded ? story.description : `${shortText}...`}
                </p>

                {story.description.length > 120 && (
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : story._id)}
                    className="text-orange-600 text-sm font-semibold mt-2 w-fit hover:underline"
                  >
                    {isExpanded ? "See less" : "See more"}
                  </button>
                )}

                {/* SECONDARY ACTIONS */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <a
                    href={story.articleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-orange-600 font-semibold text-sm hover:underline"
                  >
                    Read Article <FaExternalLinkAlt size={11} />
                  </a>

                  <button
                    onClick={() =>
                      dispatch(
                        togglePublishStory({
                          id: story._id,
                          isPublished: !story.isPublished,
                        })
                      )
                    }
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md font-semibold transition ${
                      story.isPublished
                        ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {story.isPublished ? (
                      <>
                        <FaEyeSlash size={12} /> Unpublish
                      </>
                    ) : (
                      <>
                        <FaEye size={12} /> Publish
                      </>
                    )}
                  </button>
                </div>

                {/* EDIT / DELETE — same pill-button pattern as the Events cards */}
                <div className="flex gap-3 mt-3">
                  <Link to={`/updateimpactstory/${story._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-semibold py-2 rounded-lg transition">
                      <FaEdit size={13} /> Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => setDeleteId(story._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold py-2 rounded-lg transition"
                  >
                    <FaTrashAlt size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredStories.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-16">
            No stories found.
          </p>
        )}
      </div>

      {/* =========================
          DELETE CONFIRM MODAL
      ========================== */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg animate-scaleIn">
            <h3 className="text-lg font-bold mb-2">Delete Story?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  dispatch(deleteImpactStory(deleteId));
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactStories;