import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  GraduationCap,
  Users,
  Leaf,
  Heart,
  HandHeart,
  Sprout,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import "./Hero.css";

/* =========================================================
   IMAGES
   Real, unbranded stock photography (Pexels, watermark-free,
   free to use) chosen to actually match each slide's subject
   instead of generic "AI-looking" stock filler.
========================================================= */
import slide1 from "../../../../Public/Slide/Slide-1.png";
// Children/students learning together — matches education + community

import slide2 from "../../../../Public/Slide/Slide-2.jpg"
// Community volunteers working together — matches care + small actions

import slide3 from "../../../../Public/Slide/Slide-3.jpg"

import slide4 from "../../../../Public/Slide/Slide-4.jpg"

import slide5 from "../../../../Public/Slide/Slide-5.jpg"


// Children together outdoors — matches child care, growth and happiness
/* =========================================================
   SLIDE CONTENT
   Written the way the Foundation would actually talk about
   its own work — specific, plain, no filler buzzwords.
========================================================= */
const slides = [
  {
    id: 1,
    type: "impact",
    image: slide1,
    imageAlt:
      "Monark Foundation volunteers working together during an outdoor community activity",

    badge: "Together, We Make A Difference",
    title: "Real people,",
    highlight: "real action, real impact.",
    description:
      "Our volunteers come together to serve the community through hands-on activities, outreach and meaningful local initiatives — turning commitment into action.",

    cta: {
      label: "Become A Member",
      icon: HandHeart,
      to: "/register",
    },

    icons: [
      {
        icon: Users,
        title: "COMMUNITY",
        subtitle: "TOGETHER",
        color: "green",
      },
      {
        icon: HandHeart,
        title: "VOLUNTEER",
        subtitle: "SUPPORT",
        color: "orange",
      },
      {
        icon: Heart,
        title: "CARE",
        subtitle: "& SERVICE",
        color: "navy",
      },
      {
        icon: Leaf,
        title: "POSITIVE",
        subtitle: "IMPACT",
        color: "green",
      },
    ],
  },

  {
    id: 2,
    type: "nature",
    image: slide2,
    imageAlt:
      "Monark Foundation team members standing together at a Foundation event",

    badge: "A Team With A Purpose",
    title: "Many people,",
    highlight: "one shared purpose.",
    description:
      "Behind every initiative is a committed team working together with dedication, responsibility and a shared belief in creating positive change.",

    icons: [
      {
        icon: Users,
        title: "TEAM",
        subtitle: "UNITY",
        color: "navy",
      },
      {
        icon: HeartHandshake,
        title: "SHARED",
        subtitle: "PURPOSE",
        color: "orange",
      },
      {
        icon: HandHeart,
        title: "COMMITMENT",
        subtitle: "TO SERVICE",
        color: "green",
      },
      {
        icon: Sparkles,
        title: "TOGETHER",
        subtitle: "WE GROW",
        color: "navy",
      },
    ],
  },

  {
    id: 3,
    type: "education",
    image: slide3,
    imageAlt:
      "Monark Foundation volunteers distributing items to children during a community activity",

    badge: "Serving The Community",
    title: "Small acts of kindness,",
    highlight: "big moments of joy.",
    description:
      "From reaching children in the community to sharing essential support, our volunteers believe that every helping hand can make someone's day a little brighter.",

    icons: [
      {
        icon: HeartHandshake,
        title: "COMMUNITY",
        subtitle: "CARE",
        color: "orange",
      },
      {
        icon: Heart,
        title: "KINDNESS",
        subtitle: "IN ACTION",
        color: "navy",
      },
      {
        icon: Users,
        title: "PEOPLE",
        subtitle: "FIRST",
        color: "green",
      },
      {
        icon: HandHeart,
        title: "GIVE",
        subtitle: "WITH HEART",
        color: "navy",
      },
    ],
  },

  {
    id: 4,
    type: "together",
    image: slide4,
    imageAlt:
      "Young cadets participating in a community and environmental activity with Monark Foundation",

    badge: "Youth In Action",
    title: "Young hands,",
    highlight: "a cleaner tomorrow.",
    description:
      "We encourage young people to take an active role in their communities through teamwork, responsibility and activities that help create a cleaner and better environment.",

    cta: {
      label: "Volunteer With Us",
      icon: HeartHandshake,
      to: "/register",
    },

    secondaryCta: {
      label: "Become A Member",
      to: "/register",
    },

    icons: [
      {
        icon: Users,
        title: "YOUTH",
        subtitle: "POWER",
        color: "navy",
      },
      {
        icon: Leaf,
        title: "ENVIRONMENT",
        subtitle: "CARE",
        color: "green",
      },
      {
        icon: HeartHandshake,
        title: "TEAMWORK",
        subtitle: "IN ACTION",
        color: "orange",
      },
      {
        icon: TrendingUp,
        title: "BETTER",
        subtitle: "TOMORROW",
        color: "navy",
      },
    ],
  },

  {
    id: 5,
    type: "children",
    image: slide5,
    imageAlt:
      "Monark Foundation community event where individuals are being honoured and supported",

    badge: "Celebrating Community",
    title: "Every contribution,",
    highlight: "deserves to be celebrated.",
    description:
      "Our journey is made possible by people who contribute their time, energy and support. Together, we celebrate the people who help turn our vision into meaningful community impact.",

    icons: [
      {
        icon: Heart,
        title: "APPRECIATE",
        subtitle: "EVERYONE",
        color: "orange",
      },
      {
        icon: Users,
        title: "COMMUNITY",
        subtitle: "TOGETHER",
        color: "navy",
      },
      {
        icon: HandHeart,
        title: "HONOUR",
        subtitle: "SERVICE",
        color: "green",
      },
      {
        icon: Sparkles,
        title: "INSPIRE",
        subtitle: "OTHERS",
        color: "orange",
      },
    ],
  },
];

/* =========================================================
   SMALL SECTION LABEL
========================================================= */

const SectionLabel = ({ children, light = false }) => {
  return (
    <div
      className={`flex items-center gap-2 mb-4 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] ${
        light ? "text-orange-400" : "text-[#ff5a1f]"
      }`}
    >
      <span className="w-8 h-[3px] bg-[#ff5a1f]" />
      {children}
    </div>
  );
};

/* =========================================================
   ICON COLOR
========================================================= */

const getIconColor = (color) => {
  const colors = {
    orange: "bg-[#ff5a1f]",
    green: "bg-[#287b35]",
    navy: "bg-[#06245c]",
  };

  return colors[color] || colors.navy;
};

/* =========================================================
   BOTTOM ICONS
========================================================= */

const BottomIcons = ({ icons, light = false }) => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-20">
      {icons.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 min-w-0"
          >
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full ${getIconColor(
                item.color,
              )} flex items-center justify-center text-white shadow-md`}
            >
              <Icon size={19} />
            </div>

            <div
              className={`flex flex-col text-center sm:text-left text-[7px] sm:text-[9px] font-extrabold leading-tight ${
                light ? "text-white" : "text-[#06245c]"
              }`}
            >
              <span>{item.title}</span>
              {item.subtitle && <span>{item.subtitle}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================
   SHARED TEXT BLOCK
   Vertically centered with clamp()-based spacing instead of
   fixed vh offsets, so headline position stays consistent
   across phones, tablets and short laptop screens.
========================================================= */

const HeadingBlock = ({
  slide,
  headingLevel: Heading = "h2",
  highlightColor = "text-[#ff5a1f]",
  light = false,
  maxWidth = "max-w-xl",
}) => (
  <>
    <SectionLabel light={light}>{slide.badge}</SectionLabel>

    <Heading
      className={`${
        light ? "text-white" : "text-[#06245c]"
      } uppercase font-black leading-[0.95] tracking-tight text-[36px] sm:text-5xl lg:text-6xl xl:text-7xl`}
    >
      {slide.title}
      <span className={`block ${highlightColor} mt-2`}>{slide.highlight}</span>
    </Heading>

    <p
      className={`mt-5 ${maxWidth} text-sm sm:text-base font-medium leading-relaxed ${
        light ? "text-white/90" : "text-gray-800"
      }`}
    >
      {slide.description}
    </p>
  </>
);
/* =========================================================
   SLIDE 1 — IMPACT
   Special layout for Slide 1 image
========================================================= */

const ImpactSlide = ({ slide, isFirstSlide }) => {
  const CtaIcon = slide.cta?.icon;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}
      <img
        src={slide.image}
        alt={slide.imageAlt}
        loading={isFirstSlide ? "eager" : "lazy"}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          object-center
        "
      />

      {/* =====================================================
          LEFT DARK GRADIENT
          Transparent — DOES NOT HIDE PEOPLE
      ===================================================== */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-black/55
          via-black/20
          via-45%
          to-transparent
        "
      />

      {/* =====================================================
          TOP CONTENT
          Kept in clear upper-left area
      ===================================================== */}
      <div
        className="
          absolute
          top-[7%]
          left-6
          sm:left-10
          lg:left-14
          z-20
          w-[90%]
          sm:w-[52%]
          lg:w-[46%]
          xl:w-[44%]
          max-w-[650px]
        "
      >
        {/* Section Label */}
        <SectionLabel light>{slide.badge}</SectionLabel>

        {/* Heading */}
        <h1
          className="
            text-white
            uppercase
            font-black
            leading-[0.92]
            tracking-[-0.02em]
            text-[34px]
            sm:text-5xl
            lg:text-6xl
            xl:text-[68px]
          "
        >
          <span className="block whitespace-nowrap">{slide.title}</span>

          <span
            className="
              block
              text-[#ff5a1f]
              mt-2
            "
          >
            {slide.highlight}
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            mt-5
            max-w-[560px]
            text-xs
            sm:text-sm
            lg:text-base
            font-semibold
            leading-[1.55]
            text-white
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]
          "
        >
          {slide.description}
        </p>

        {/* CTA */}
        {slide.cta && (
          <div className="mt-6">
            <Link
              to={slide.cta.to}
              className="
                h-11
                sm:h-12
                px-5
                sm:px-6
                rounded-md
                bg-[#ff5a1f]
                text-white
                font-bold
                text-xs
                sm:text-sm
                inline-flex
                items-center
                gap-2
                shadow-lg
                hover:bg-orange-600
                transition
              "
            >
              {slide.cta.label}
              <CtaIcon size={18} />
            </Link>
          </div>
        )}
      </div>

      {/* =====================================================
          BOTTOM ICONS
          SAME AS YOUR EXISTING DESIGN
      ===================================================== */}
      <div
        className="
          absolute
          left-6
          sm:left-10
          lg:left-14
          bottom-8
          sm:bottom-7
          w-[55%]
          z-20
        "
      >
        <BottomIcons icons={slide.icons} light />
      </div>

      {/* =====================================================
          ORANGE DECORATIVE CIRCLE
          SAME AS EXISTING
      ===================================================== */}
      <div
        className="
          absolute
          right-[-15%]
          bottom-[-30%]
          w-[45%]
          h-[45%]
          bg-[#ff5a1f]
          rounded-full
          opacity-90
        "
      />
    </div>
  );
};
/* =========================================================
   SLIDE 2 — Nature (organic blob, green)
========================================================= */

const NatureSlide = ({ slide }) => {
  const CtaIcon = slide.cta?.icon;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={slide.image}
        alt={slide.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 pb-28 sm:pb-32">
        <div className="max-w-2xl">
          <HeadingBlock
            slide={slide}
            light
            highlightColor="text-[#8fd19e]"
            maxWidth="max-w-lg"
          />

          <div className="flex flex-wrap gap-3 mt-7">
            {slide.cta && (
              <Link
                to={slide.cta.to}
                className="h-12 px-6 rounded-md bg-[#ff5a1f] text-white font-bold text-sm hidden sm:inline-flex items-center gap-2 hover:bg-orange-600 transition"
              >
                {slide.cta.label}
                <CtaIcon size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute left-6 sm:left-10 lg:left-14 bottom-8 w-[55%] z-20">
        <BottomIcons icons={slide.icons} light />
      </div>

      {/* Shape: organic blob — asymmetric border-radius, like a leaf/pond shape */}
      <div
        className="absolute right-[-8%] bottom-[-30%] w-[48%] h-[48%] bg-[#287b35] opacity-90"
        style={{ borderRadius: "62% 38% 55% 45% / 45% 55% 40% 60%" }}
      />
    </div>
  );
};

/* =========================================================
   SLIDE 3 — Education (rotated diamond/square, navy)
========================================================= */

const EducationSlide = ({ slide }) => {
  const CtaIcon = slide.cta?.icon;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={slide.image}
        alt={slide.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 pb-28 sm:pb-32">
        <div className="max-w-lg">
          <HeadingBlock slide={slide} light maxWidth="max-w-sm" />

          <div className="w-12 h-[3px] bg-[#ff5a1f] mt-6" />

          {slide.cta && (
            <Link
              to={slide.cta.to}
              className="mt-6 h-12 px-6 rounded-md bg-[#ff5a1f] text-white font-bold text-sm hidden sm:inline-flex items-center gap-2 hover:bg-orange-600 transition shadow-lg"
            >
              {slide.cta.label}
              <CtaIcon size={18} />
            </Link>
          )}
        </div>
      </div>

      <div className="absolute left-6 sm:left-10 lg:left-14 bottom-8 w-[55%] z-20">
        <BottomIcons icons={slide.icons} light />
      </div>

      {/* Shape: rotated square (diamond) with softened corners */}
      <div className="absolute right-[-2%] bottom-[-20%] w-[34%] h-[34%] bg-[#06245c] opacity-90 rounded-3xl rotate-180" />
    </div>
  );
};

/* =========================================================
   SLIDE 4 — Together (elongated pill/capsule, amber)
========================================================= */

const TogetherSlide = ({ slide }) => {
  const CtaIcon = slide.cta?.icon;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={slide.image}
        alt={slide.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 pb-28 sm:pb-32">
        <div className="max-w-2xl">
          <HeadingBlock slide={slide} light maxWidth="max-w-lg" />

          <div className="flex flex-wrap gap-3 mt-7">
            {slide.cta && (
              <Link
                to={slide.cta.to}
                className="h-12 px-6 rounded-md bg-[#ff5a1f] text-white font-bold text-sm hidden sm:inline-flex items-center gap-2 hover:bg-orange-600 transition"
              >
                {slide.cta.label}
                <CtaIcon size={18} />
              </Link>
            )}

            {slide.secondaryCta && (
              <Link
                to={slide.secondaryCta.to}
                className="h-12 px-6 rounded-md bg-white text-[#06245c] font-bold text-sm hidden sm:inline-flex items-center hover:bg-gray-100 transition"
              >
                {slide.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute left-6 sm:left-10 lg:left-14 bottom-8 w-[55%] z-20">
        <BottomIcons icons={slide.icons} light />
      </div>

      {/* Shape: elongated pill, rotated diagonally */}
      <div className="absolute right-[-15%] bottom-[-13%] w-[65%] h-[25%] bg-[#ff8903] opacity-90 rounded-full -rotate-[18deg]" />
    </div>
  );
};

/* =========================================================
   SLIDE 5 — Children (playful blob cluster, coral/pink)
========================================================= */

const ChildrenSlide = ({ slide }) => {
  const CtaIcon = slide.cta?.icon;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={slide.image}
        alt={slide.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 pb-28 sm:pb-32">
        <div className="max-w-2xl">
          <HeadingBlock
            slide={slide}
            light
            highlightColor="text-[#8fd19e]"
            maxWidth="max-w-lg"
          />

          <div className="flex flex-wrap gap-3 mt-7">
            {slide.cta && (
              <Link
                to={slide.cta.to}
                className="h-12 px-6 rounded-md bg-[#ff5a1f] text-white font-bold text-sm hidden sm:inline-flex items-center gap-2 hover:bg-orange-600 transition"
              >
                {slide.cta.label}
                <CtaIcon size={18} fill="currentColor" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute left-6 sm:left-10 lg:left-14 bottom-8 w-[55%] z-20">
        <BottomIcons icons={slide.icons} light />
      </div>

      {/* Shape: two overlapping circles — a playful "cluster" look */}
      <div className="absolute right-[-6%] bottom-[-22%] w-[38%] h-[38%] bg-[#ff4d6d] opacity-90 rounded-full" />
    </div>
  );
};
/* =========================================================
   HERO
========================================================= */

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(nextSlide, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      className="relative w-full h-[92svh] min-h-[680px] md:min-h-[820px] overflow-hidden bg-[#f8f7f3]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Monark Foundation highlights"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current
              ? "opacity-100 visible scale-100 z-10"
              : "opacity-0 invisible scale-[1.02] z-0"
          }`}
          aria-hidden={index !== current}
        >
          {slide.type === "impact" && (
            <ImpactSlide slide={slide} isFirstSlide={index === 0} />
          )}
          {slide.type === "nature" && <NatureSlide slide={slide} />}
          {slide.type === "education" && <EducationSlide slide={slide} />}
          {slide.type === "together" && <TogetherSlide slide={slide} />}
          {slide.type === "children" && <ChildrenSlide slide={slide} />}
        </div>
      ))}

      {/* SLIDE NAVIGATION */}
      <div className="absolute z-50 right-5 sm:right-8 bottom-5 sm:bottom-8 hidden sm:flex items-center gap-2">
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur text-[#06245c] flex items-center justify-center shadow-md hover:bg-[#ff5a1f] hover:text-white transition"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === index ? "w-8 bg-[#0011ff]" : "w-2 bg-[#06245c]/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur text-[#06245c] flex items-center justify-center shadow-md hover:bg-[#ff5a1f] hover:text-white transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
