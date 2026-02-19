import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStories,
  togglePublishStory,
  deleteStory,
} from "../../Redux/slice/Story.slice.js";
import { Link } from "react-router-dom";

const Story = () => {
  const dispatch = useDispatch();
  const { stories = [], loading } = useSelector((s) => s.story);

  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchStories());
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
        <h2 className="text-3xl font-bold text-gray-800">Stories</h2>

        <div className="flex gap-4 md:ml-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <Link to="/createstory">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
              + Create Story
            </button>
          </Link>
        </div>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredStories.map((story) => {
          const isExpanded = expandedId === story._id;
          const shortText = story.description.slice(0, 120);

          return (
            <div
              key={story._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {/* MEDIA */}
              <div className="relative h-48">
                {story.mediaType === "video" ? (
                  <video
                    src={story.mediaUrl}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={story.mediaUrl}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                )}

                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                    story.isPublished
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {story.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {story.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {isExpanded ? story.description : `${shortText}...`}
                </p>

                {story.description.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : story._id)
                    }
                    className="text-orange-600 text-sm font-semibold mt-2 w-fit"
                  >
                    {isExpanded ? "See less" : "See more"}
                  </button>
                )}

                {/* ACTIONS */}
                <div className="mt-auto pt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      dispatch(
                        togglePublishStory({
                          id: story._id,
                          isPublished: !story.isPublished,
                        })
                      )
                    }
                    className={`text-sm px-3 py-1.5 rounded-md font-semibold transition ${
                      story.isPublished
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {story.isPublished ? "Unpublish" : "Publish"}
                  </button>

                  <Link
                    to={`/updatedstory/${story._id}`}
                    className="ml-auto text-sm text-orange-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDeleteId(story._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
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

      {/* INLINE CONFIRM MODAL */}
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
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  dispatch(deleteStory(deleteId));
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
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

export default Story;
