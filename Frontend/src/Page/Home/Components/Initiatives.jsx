// src/components/Initiatives.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../../components/ProjectCard";
import { fetchEvents } from "../../../Redux/slice/Events.slice";
import { Link } from "react-router-dom";
import { LiaArrowRightSolid } from "react-icons/lia";

const AUTO_SLIDE_MS = 10000; // move 1 card every 10 seconds
const WHEEL_THROTTLE_MS = 500; // ignore rapid trackpad wheel spam
const DRAG_THRESHOLD_PX = 60; // how far you must drag/swipe before it counts as a slide change

const Initiatives = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Only one card's video should ever play at once. Whichever card starts
  // playing sets itself as the active id; every other card gets isActive
  // === false and stops itself (see ProjectCard).
  const [activePlayingId, setActivePlayingId] = useState(null);

  // Drag/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const dragStartXRef = useRef(0);
  const trackWidthRef = useRef(0);

  const wheelLockRef = useRef(false);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 640) return 2;
      return 1;
    };

    const handleResize = () => {
      setCardsPerView(updateCardsPerView());
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = loading ? 6 : events.length;
  // Last valid index so the final cards align flush with the right edge
  const maxIndex = Math.max(totalItems - cardsPerView, 0);
  const canSlide = totalItems > cardsPerView;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play: move ONE card every 10 seconds, infinite loop, pause on hover/drag
  useEffect(() => {
    if (loading || !canSlide || isHovered || isDragging) return undefined;

    const interval = setInterval(() => {
      goToNext();
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [loading, canSlide, isHovered, isDragging, goToNext]);

  // Mouse-wheel / trackpad scroll navigation
  const handleWheel = useCallback(
    (e) => {
      if (!canSlide) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 10) return;

      e.preventDefault();

      if (wheelLockRef.current) return;
      wheelLockRef.current = true;

      if (delta > 0) {
        goToNext();
      } else {
        goToPrev();
      }

      setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_THROTTLE_MS);
    },
    [canSlide, goToNext, goToPrev]
  );

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return undefined;

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  /* ---------- Touch swipe (mobile) + mouse click-drag (desktop) ---------- */
  const handlePointerDown = useCallback(
    (e) => {
      if (!canSlide) return;
      // Ignore right/middle mouse buttons
      if (e.pointerType === "mouse" && e.button !== 0) return;
      // Don't hijack clicks on buttons/links/inputs inside cards (e.g. "more", play/pause)
      if (e.target.closest("button, a, input, textarea, select")) return;

      dragStartXRef.current = e.clientX;
      trackWidthRef.current = trackRef.current?.offsetWidth || 1;
      setIsDragging(true);
      setDragOffsetPx(0);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [canSlide]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setDragOffsetPx(e.clientX - dragStartXRef.current);
    },
    [isDragging]
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;

    if (Math.abs(dragOffsetPx) > DRAG_THRESHOLD_PX) {
      if (dragOffsetPx < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setIsDragging(false);
    setDragOffsetPx(0);
  }, [isDragging, dragOffsetPx, goToNext, goToPrev]);

  const cardWidthPercent = 100 / cardsPerView;
  const baseTranslatePercent = -currentIndex * cardWidthPercent;

  // Convert the live drag distance (px) into an extra % offset on top of the base position
  const dragPercent = trackWidthRef.current
    ? (dragOffsetPx / trackWidthRef.current) * 100
    : 0;
  const translatePercent = baseTranslatePercent + dragPercent;

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
            View all Initiatives <LiaArrowRightSolid size={22} />
          </Link>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className={`relative overflow-hidden ${canSlide ? "cursor-grab active:cursor-grabbing" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            endDrag();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={trackRef}
            className="flex will-change-transform select-none"
            style={{
              transform: `translateX(${translatePercent}%)`,
              transition: isDragging ? "none" : "transform 700ms ease-out",
            }}
          >
            {(loading ? Array.from({ length: totalItems }) : events).map((item, idx) => {
              const cardId = loading ? `skeleton-${idx}` : item._id || idx;
              return (
                <div key={cardId} className="min-w-full sm:min-w-1/2 lg:min-w-1/3 px-3">
                  {loading ? (
                    <ProjectCard loading />
                  ) : (
                    <ProjectCard
                      bannerImage={item.bannerImage}
                      bannerType={item.bannerType}
                      title={item.title}
                      description={item.shortDescription}
                      venue={item.venue}
                      date={item.date}
                      category={item.category}
                      organizedBy={item.organizedBy}
                      galleryImages={item.galleryImages}
                      videoUrls={item.videoUrls}
                      isActive={activePlayingId === cardId}
                      onPlayStart={() => setActivePlayingId(cardId)}
                      onStop={() =>
                        setActivePlayingId((prev) => (prev === cardId ? null : prev))
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Initiatives;