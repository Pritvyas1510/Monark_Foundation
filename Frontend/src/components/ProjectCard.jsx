// src/components/ProjectCard.jsx
import { useRef, useState, useEffect } from "react";

const ProjectCard = ({
  mediaUrl,
  mediaType,
  category,
  title,
  description,
  city,
  date,
  loading = false,
}) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const MAX_DESC_LENGTH = 110;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.play().catch(() => {}); // mute errors in some browsers
    } else {
      video.pause();
    }
  }, [playing]);

  // Optional: reset video when it ends (loop is already set)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => setPlaying(false);
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, []);

  const playVideo = () => setPlaying(true);
  const pauseVideo = () => setPlaying(false);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse h-full flex flex-col">
        <div className="relative aspect-[4/3] bg-gray-200" />
        <div className="p-5 flex-1 flex flex-col gap-3">
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mt-auto" />
        </div>
      </div>
    );
  }

  const isVideo = mediaType === "video" && mediaUrl;
  const isImage = mediaType === "image" && mediaUrl;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const descToShow =
    showFullDescription || description.length <= MAX_DESC_LENGTH
      ? description
      : description.slice(0, MAX_DESC_LENGTH).trim() + "...";

  const showMoreBtn = description.length > MAX_DESC_LENGTH;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100"
      onMouseEnter={() => isVideo && playVideo()}
      onMouseLeave={() => isVideo && pauseVideo()}
    >
      {/* MEDIA CONTAINER */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {/* Category badge – now overlaid on media */}
        {category && (
          <span className="absolute top-3 left-3 z-20 px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-50/90 backdrop-blur-sm rounded-full shadow-sm">
            {category}
          </span>
        )}

        {/* Image */}
        {isImage && (
          <img
            src={mediaUrl}
            alt={title || "Project"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Video */}
        {isVideo && (
          <>
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-full object-cover"
              loop
              playsInline
              preload="metadata"
            />

            {/* Play/Pause overlay – shown when not auto-playing on hover */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playing ? pauseVideo() : playVideo();
              }}
              className={`
                absolute inset-0 flex items-center justify-center 
                bg-black/25 transition-opacity duration-300
                ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}
              `}
              aria-label={playing ? "Pause" : "Play"}
            >
              
            </button>
          </>
        )}

        {!isImage && !isVideo && (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No media available
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title || "Untitled Project"}
        </h4>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {descToShow}
          {showMoreBtn && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-1.5 text-orange-600 font-medium hover:underline text-sm"
            >
              {showFullDescription ? "less" : "more"}
            </button>
          )}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
          {city && (
            <div className="flex items-center gap-1.5">
              <span>📍</span> {city}
            </div>
          )}
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <span>📅</span> {formattedDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;