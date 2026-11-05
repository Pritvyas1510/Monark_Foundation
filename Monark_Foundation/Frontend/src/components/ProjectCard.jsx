// src/components/ProjectCard.jsx
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectCard = ({
  bannerImage,
  bannerType,
  category,
  title,
  description,
  venue,
  date,
  organizedBy,
  galleryImages = [],
  videoUrls = [],
  loading = false,
  // Cross-card coordination (passed down by the parent slider so that
  // playing a new card's video stops any other card's video):
  //   isActive   — false means "some other card is now playing; stop mine"
  //   onPlayStart — call when this card starts playing its video
  //   onStop      — call when this card stops playing (closed / ended)
  isActive = true,
  onPlayStart,
  onStop,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // "default" (banner/thumbnail) | "video" (playing inline) | "gallery" (browsing gallery inline)
  const [mode, setMode] = useState("default");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const videoRef = useRef(null);

  const MAX_DESC_LENGTH = 110;

  // Force unmuted playback the moment video mode is entered. Relying only on
  // the `autoPlay` attribute can get silently muted by some browsers
  // (notably Safari/iOS) — calling play() imperatively right after the
  // user's click is the reliable way to guarantee sound actually plays.
  useEffect(() => {
    if (mode !== "video" || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = false;
    video.volume = 1;
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Autoplay-with-sound was blocked by the browser — the visible
        // native controls still let the person press play manually.
      });
    }
  }, [mode]);

  // Another card became the active player — stop this one and go back to
  // showing the banner/thumbnail.
  useEffect(() => {
    if (mode === "video" && !isActive) {
      setMode("default");
    }
  }, [isActive, mode]);

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

  /* -------- media fallback chain (for the default thumbnail) --------
     1. banner image (if bannerType is "image")
     2. first gallery image (if banner is a video, or missing)
     3. otherwise: video-only placeholder (if a video exists) or "no media"
  */
  const displayImage =
    bannerType !== "video" && bannerImage
      ? bannerImage
      : galleryImages?.[0] || null;

  const playableVideoUrl =
    bannerType === "video" && bannerImage ? bannerImage : videoUrls?.[0] || null;

  const galleryList = galleryImages?.length
    ? galleryImages
    : displayImage
    ? [displayImage]
    : [];

  const hasVideo = Boolean(playableVideoUrl);
  const hasGallery = galleryList.length > 0;
  const galleryCount = galleryImages?.length || 0;
  const videoCount = videoUrls?.length || (bannerType === "video" && bannerImage ? 1 : 0);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;
  const isoDate = date ? new Date(date).toISOString().slice(0, 10) : null;

  const descToShow =
    showFullDescription || description.length <= MAX_DESC_LENGTH
      ? description
      : description.slice(0, MAX_DESC_LENGTH).trim() + "...";

  const showMoreBtn = description.length > MAX_DESC_LENGTH;

  const openVideo = (e) => {
    e.stopPropagation();
    onPlayStart?.();
    setMode("video");
  };

  const openGallery = (e) => {
    e.stopPropagation();
    setGalleryIndex(0);
    setMode("gallery");
  };

  const stopVideo = () => {
    onStop?.();
    setMode("default");
  };

  const backToDefault = (e) => {
    e.stopPropagation();
    if (mode === "video") {
      stopVideo();
    } else {
      setMode("default");
    }
  };

  const nextGalleryImage = (e) => {
    e.stopPropagation();
    setGalleryIndex((i) => (i + 1) % galleryList.length);
  };

  const prevGalleryImage = (e) => {
    e.stopPropagation();
    setGalleryIndex((i) => (i - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
      {/* MEDIA CONTAINER */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {/* Category badge — hidden while playing video/gallery to reduce clutter */}
        {category && mode === "default" && (
          <span className="absolute top-3 left-3 z-20 px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-50/90 backdrop-blur-sm rounded-full shadow-sm">
            {category}
          </span>
        )}

        {/* Media count badges — clickable, only in default mode */}
        {mode === "default" && (videoCount > 0 || galleryCount > 0) && (
          <div className="absolute top-3 right-3 z-20 flex gap-1.5">
            {videoCount > 0 && (
              <button
                type="button"
                onClick={openVideo}
                aria-label={`Play video (${videoCount} available)`}
                className="px-2.5 py-1 text-xs font-medium text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1 transition"
              >
                🎬 {videoCount}
              </button>
            )}
            {galleryCount > 0 && (
              <button
                type="button"
                onClick={openGallery}
                aria-label={`View gallery (${galleryCount} photos)`}
                className="px-2.5 py-1 text-xs font-medium text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1 transition"
              >
                🖼️ {galleryCount}
              </button>
            )}
          </div>
        )}

        {/* ---------- DEFAULT MODE: thumbnail + hover play button ---------- */}
        {mode === "default" && (
          <>
            {displayImage && (
              <img
                src={displayImage}
                alt={title ? `${title} — event photo` : "Event photo"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            )}

            {!displayImage && hasVideo && (
              <div className="w-full h-full bg-gray-900" />
            )}

            {!displayImage && !hasVideo && (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                No media available
              </div>
            )}

            {/* PLAY BUTTON — click replaces the banner with the playing video, inline */}
            {hasVideo && (
              <button
                type="button"
                onClick={openVideo}
                aria-label="Play video"
                className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                  displayImage ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <span className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <FaPlay className="text-orange-600 ml-0.5" size={18} />
                </span>
              </button>
            )}
          </>
        )}

        {/* ---------- VIDEO MODE: plays inline in place of the banner ---------- */}
        {mode === "video" && hasVideo && (
          <>
            <video
              ref={videoRef}
              src={playableVideoUrl}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-cover bg-black"
              onEnded={stopVideo}
            />
            <button
              type="button"
              onClick={backToDefault}
              aria-label="Close video"
              className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center shadow"
            >
              <FaTimes size={12} />
            </button>
          </>
        )}

        {/* ---------- GALLERY MODE: browse gallery images in place of the banner ---------- */}
        {mode === "gallery" && hasGallery && (
          <>
            <img
              src={galleryList[galleryIndex]}
              alt={
                title
                  ? `${title} — gallery photo ${galleryIndex + 1} of ${galleryList.length}`
                  : `Gallery photo ${galleryIndex + 1} of ${galleryList.length}`
              }
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={backToDefault}
              aria-label="Close gallery"
              className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center shadow"
            >
              <FaTimes size={12} />
            </button>

            {galleryList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevGalleryImage}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/85 hover:bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center shadow"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  type="button"
                  onClick={nextGalleryImage}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/85 hover:bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center shadow"
                >
                  <FaChevronRight size={12} />
                </button>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 text-xs text-white bg-black/50 px-2 py-0.5 rounded-full">
                  {galleryIndex + 1} / {galleryList.length}
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title || "Untitled Project"}
        </h4>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 text-justify">
          {descToShow}
          {showMoreBtn && (
            <button
              onClick={() => setShowFullDescription((prev) => !prev)}
              aria-label={showFullDescription ? "Show less description" : "Show more description"}
              className="ml-1.5 text-orange-600 font-medium hover:underline text-sm"
            >
              {showFullDescription ? "less" : "more"}
            </button>
          )}
        </p>

        {organizedBy && (
          <p className="text-xs text-gray-500 mb-2">
            Organized by <span className="font-medium text-gray-700">{organizedBy}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
          {venue && (
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true">📍</span> <span>{venue}</span>
            </div>
          )}
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <span aria-hidden="true">📅</span>
              <time dateTime={isoDate}>{formattedDate}</time>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;