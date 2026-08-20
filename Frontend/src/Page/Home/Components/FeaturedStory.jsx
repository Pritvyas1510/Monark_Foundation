import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbArrowIteration } from "react-icons/tb";
import { FaTimes, FaHandsHelping } from "react-icons/fa";
import { fetchImpactStories } from "../../../Redux/slice/ImpactStory.slice"; // ✅ fixed casing
import Logo from "../../../../Public/Image/Logo.png";

const FeaturedStory = () => {
  const dispatch = useDispatch();
  const { stories = [], loading } = useSelector((s) => s.userImpact); // ✅ fixed key

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    dispatch(fetchImpactStories());
  }, [dispatch]);

  const publishedStories = Array.isArray(stories)
    ? stories.filter((s) => s.isPublished)
    : [];

  useEffect(() => {
    if (!publishedStories.length) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % publishedStories.length);
        setFade(true);
      }, 400);
    }, 50000);

    return () => clearInterval(interval);
  }, [publishedStories.length]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowVideo(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = showVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  if (loading || !publishedStories.length) return null;

  const story = publishedStories[index];

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 lg:mb-14">
          <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-2">
            Explore Story
          </span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-main dark:text-white">
            Stories That Drive Change
          </h2>
          <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div
          className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 transition-all duration-500 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* IMAGE — always first (top on mobile/tablet, left on desktop) */}
          <div className="w-full lg:w-1/2 order-1">
            <div className="relative">
              <div className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] aspect-square mx-auto rounded-2xl flex items-center justify-center overflow-hidden group">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="max-w-full max-h-full object-contain transition-all duration-500"
                />
              </div>

              <div
                className="absolute -bottom-8 -right-4 sm:-right-8 bg-white dark:bg-surface-dark px-4 py-3 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-full overflow-hidden ring-1 ring-gray-100">
                    <img
                      src={Logo}
                      className="w-full h-full object-cover"
                      alt="Monark Foundation logo"
                    />
                  </div>
                  <p className="text-[#2c5466] text-base sm:text-lg uppercase font-extrabold tracking-tight leading-tight whitespace-nowrap">
                    Monark Foundation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TEXT — always second (below the image on mobile/tablet, right on desktop) */}
          <div className="w-full lg:w-1/2 order-2 mt-10 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest">
                {story.subtitle || "Making real change in communities."}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="block text-white dark:text-white">
                {story.title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="block text-blue-500">
                {story.title.split(" ").slice(2).join(" ")}
              </span>
            </h2>

            <div className="text-sm text-text-main/80 dark:text-white/70 leading-relaxed mb-6 pr-3 max-h-[180px] overflow-y-auto whitespace-pre-line">
              {story.description}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="pl-4 border-l-4 border-primary/30">
                <h4 className="text-2xl font-bold">
                  {story.peopleImpacted || "100+"}
                </h4>
                <p className="text-sm text-gray-500">Program Beneficiaries</p>
              </div>

              <div className="pl-4 border-l-4 border-primary/30">
                <h4 className="text-2xl font-bold">
                  {story.availability || "Ongoing"}
                </h4>
                <p className="text-sm text-gray-500">Community Reach</p>
              </div>
            </div>

            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-text-main dark:bg-orange-500 rounded-lg font-bold hover:bg-primary hover:text-white transition-all shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              Read the full story
              <TbArrowIteration size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= VIDEO MODAL ================= */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL NAVBAR */}
            <div className="flex items-center justify-between px-5 py-3 bg-gray-900">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-white/20">
                  <img
                    src={Logo}
                    className="w-full h-full object-cover"
                    alt="Monark Foundation logo"
                  />
                </div>
                <span className="text-white font-bold text-sm tracking-wide">
                  Monark Foundation
                </span>
              </div>

              <button
                onClick={() => setShowVideo(false)}
                aria-label="Close video"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* VIDEO */}
            <div className="bg-black">
              {story.videoUrl ? (
                <video
                  src={story.videoUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[65vh]"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-white/70 text-sm">
                  No video available for this story.
                </div>
              )}
            </div>

            {/* STORY INFO */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
              {story.subtitle && (
                <p className="text-orange-600 font-medium text-sm mt-1">
                  {story.subtitle}
                </p>
              )}
              <p className="text-gray-600 text-sm leading-relaxed mt-3 max-h-32 overflow-y-auto">
                {story.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedStory;