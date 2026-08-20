import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStories,
  togglePublishStory,
  deleteStory,
} from "../../Redux/slice/Story.slice.js";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";

const StoryMedia = ({ mediaUrl, mediaType, title }) => {
  const videoRef = useRef(null);
  const isVideo = mediaType === "video" && mediaUrl;

  const playVideo = () => videoRef.current?.play().catch(() => {});
  const pauseVideo = () => videoRef.current?.pause();

  return (
    <div
      className="relative h-48 bg-black"
      onMouseEnter={() => isVideo && playVideo()}
      onMouseLeave={() => {
        if (isVideo) {
          pauseVideo();
          if (videoRef.current) videoRef.current.currentTime = 0;
        }
      }}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={mediaUrl}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={mediaUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

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
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        <p className="text-gray-500 text-sm">Loading stories...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Stories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all stories
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

          <Link to="/createstory">
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
              {/* MEDIA */}
              <div className="relative">
                <StoryMedia
                  mediaUrl={story.mediaUrl}
                  mediaType={story.mediaType}
                  title={story.title}
                />

                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 ${
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

                {(story.name || story.role) && (
                  <p className="text-xs text-gray-500 mb-3">
                    {story.name}
                    {story.name && story.role && " — "}
                    <span className="font-semibold text-gray-700">
                      {story.role}
                    </span>
                  </p>
                )}

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

                {/* PUBLISH TOGGLE */}
                <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
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

                {/* EDIT / DELETE */}
                <div className="flex gap-3 mt-3">
                  <Link to={`/updatedstory/${story._id}`} className="flex-1">
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

      {/* DELETE CONFIRM MODAL */}
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
                  dispatch(deleteStory(deleteId));
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

export default Story;