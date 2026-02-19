// src/components/Initiatives.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../../components/ProjectCard";
import { fetchEvents } from "../../../Redux/slice/Events.slice";
import { Link } from "react-router-dom";
import { LiaArrowRightSolid, LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const Initiatives = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Determine how many cards to show based on screen width
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 640) return 2;
      return 1;
    };

    const handleResize = () => {
      const newValue = updateCardsPerView();
      setCardsPerView(newValue);
      // Reset to first page when layout changes significantly
      setCurrentSlide(0);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play only on mobile (1 card visible)
  useEffect(() => {
    if (cardsPerView !== 1 || loading || events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [cardsPerView, events.length, loading]);

  const totalItems = loading ? 6 : events.length;
  const totalSlides = Math.ceil(totalItems / cardsPerView);

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const translatePercent = -currentSlide * 100;

  return (
    <section className="py-24 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-5">
          <div>
            <h2 className="text-orange-600 text-sm font-bold text-[10px] uppercase tracking-widest mb-3">
              From Vision to Reality
            </h2>
            <h3 className="text-2xl md:text-2xl font-bold text-gray-900">
              Initiatives we proudly completed
            </h3>
          </div>

          <Link
            to="/event"
            className="hidden md:flex text-[15px] items-center gap-1 text-orange-600 font-bold hover:underline"
          >
            View all projects <LiaArrowRightSolid size={22} />
          </Link>
        </div>

        {/* ===== Unified Slider ===== */}
        <div className="relative overflow-hidden">
          <div
            className="
              flex will-change-transform
              transition-transform duration-700 ease-out
            "
            style={{ transform: `translateX(${translatePercent}%)` }}
          >
            {(loading ? Array.from({ length: totalItems }) : events).map((item, idx) => (
              <div
                key={loading ? `skeleton-${idx}` : (item._id || idx)}
                className="min-w-full sm:min-w-1/2 lg:min-w-1/3 px-3"
              >
                {loading ? (
                  <ProjectCard loading />
                ) : (
                  <ProjectCard
                    mediaUrl={item.mediaUrl}
                    mediaType={item.mediaType}
                    title={item.title}
                    description={item.description}
                    city={item.location}
                    date={item.date}
                    category={item.organizedBy}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Navigation – same on all devices ===== */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10  flex-wrap">
            <button
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={!canGoPrev}
              aria-label="Previous slide"
              className={`
                flex h-11 text-[8px] w-11 items-center justify-center rounded-full transition-all
                ${
                  canGoPrev
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200 active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <LiaAngleLeftSolid size={22} />
            </button>

            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`
                  h-11 w-11 text-[15px] rounded-full text-sm font-semibold transition-all
                  ${
                    currentSlide === i
                      ? "bg-orange-600 text-white shadow-md scale-105"
                      : "bg-orange-50 text-orange-800 hover:bg-orange-100 hover:scale-105 active:scale-95"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={!canGoNext}
              aria-label="Next slide"
              className={`
                flex h-11 w-11 text-[10px] items-center justify-center rounded-full transition-all
                ${
                  canGoNext
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200 active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <LiaAngleRightSolid size={22} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Initiatives;