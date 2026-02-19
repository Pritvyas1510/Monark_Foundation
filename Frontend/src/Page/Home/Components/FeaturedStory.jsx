import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbArrowIteration } from "react-icons/tb";
import { fetchImpactStories } from "../../../Redux/slice/Impactstory.slice";
import Logo from "../../../../Public/Image/Logo.png";

const FeaturedStory = () => {
  const dispatch = useDispatch();
  const { stories = [], loading } = useSelector((s) => s.impact);

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

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

  if (loading || !publishedStories.length) return null;

  const story = publishedStories[index];

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center gap-16 transition-all duration-500 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* IMAGE */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="rounded-2xl shadow-2xl w-full max-h-[520px] object-contain bg-white transition-all duration-500"
              />

              <div
                className="absolute -bottom-8 -right-8 bg-white dark:bg-surface-dark p-3 rounded-xl shadow-xl border max-w-xs animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                    <img
                      src={Logo}
                      className="rounded-full border-2 border-black"
                      alt="Logo"
                    />
                  </div>
                  <p className="text-[#2c5466] text-lg uppercase font-bold">
                    Monark Foundation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest">
                {story.subtitle || "Making real change in communities."}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="block text-white dark:text-white">
                {story.title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="block text-blue-500">
                {story.title.split(" ").slice(2).join(" ")}
              </span>
            </h2>

            {/* SCROLLABLE DESCRIPTION */}
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

            <a
              href={story.articleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-text-main dark:bg-orange-500 rounded-lg font-bold hover:bg-primary hover:text-white transition-all shadow-lg hover:-translate-y-1"
            >
              Read the full story
              <TbArrowIteration size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;
