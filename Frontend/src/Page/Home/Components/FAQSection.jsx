import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../../Redux/slice/Testimonial.slice.js";

const TestimonialsSlider = () => {
  const dispatch = useDispatch();
  const { testimonials = [], loading } = useSelector((s) => s.testimonial);

  const [current, setCurrent] = useState(0);

  /* FETCH FROM BACKEND */
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  /* AUTO SLIDE */
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 30000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="py-24 text-center text-lg font-semibold">
        Loading stories...
      </div>
    );
  }

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section className="bg-background-light dark:bg-background-dark transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-14">
          <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-2">
            Real Stories
          </span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-main dark:text-white">
            Lives We’ve Touched
          </h2>
          <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Slider */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Image / Video */}
          <div className="relative group flex justify-center">
            <div className="absolute -inset-3 bg-primary/10 rounded-3xl blur-xl transition group-hover:bg-primary/20" />

            {t.mediaType === "video" ? (
              <video
                key={t.mediaUrl}
                src={t.mediaUrl}
                controls
                controlsList="nodownload"
                autoPlay
                className="relative rounded-2xl shadow-xl max-h-[420px] w-auto object-contain animate-fadeSlide"
              />
            ) : (
              <img
                key={t.mediaUrl}
                src={t.mediaUrl}
                alt={t.title}
                className="relative rounded-2xl shadow-xl max-h-[420px] w-auto object-contain animate-fadeSlide"
              />
            )}
          </div>

          {/* Content */}
          <div className="animate-fadeSlide flex flex-col justify-between h-full">
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4">
              {t.title}
            </h3>

            {/* Description scroll */}
            <div className="h-44 lg:h-56 overflow-y-auto pr-3 space-y-4">
              {t.description
                .split("\n")
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-base lg:text-lg leading-relaxed text-text-main/80 dark:text-text-light/80"
                  >
                    {para}
                  </p>
                ))}
            </div>

            {/* Name & role */}
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-1 bg-primary/40" />
              <div>
                <h4 className="text-lg font-semibold text-text-main dark:text-white">
                  {t.name}
                </h4>
                <p className="text-primary text-xs font-medium uppercase tracking-wider">
                  {t.role}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === current
                        ? "bg-primary w-6"
                        : "bg-gray-300 dark:bg-gray-700 w-2.5 hover:bg-primary"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setCurrent(
                      current === 0 ? testimonials.length - 1 : current - 1,
                    )
                  }
                  className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white transition"
                >
                  <FiArrowLeft size={18} />
                </button>

                <button
                  onClick={() =>
                    setCurrent(
                      current === testimonials.length - 1 ? 0 : current + 1,
                    )
                  }
                  className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white transition"
                >
                  <FiArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
