// src/components/Initiatives.jsx
import { useState } from "react";
import ProjectCard from "../../../components/ProjectCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LiaArrowRightSolid } from "react-icons/lia";

const Initiatives = () => {
  const allProjects = [
    {
      id: 1,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.STACA07mo-A9VinK7UCSHgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Education",
      title: "Build Schools in Rural Areas",
      description:
        "Helping children access quality education by building modern schools in underserved communities across Gujarat.",
      progress: 75,
      raised: "₹7,50,000",
      goal: "₹10,00,000",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800",
      category: "Water",
      title: "Clean Drinking Water Initiative",
      description:
        "Installing handpumps and RO systems to provide safe drinking water in drought-affected villages.",
      progress: 60,
      raised: "₹6,00,000",
      goal: "₹10,00,000",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
      category: "Healthcare",
      title: "Mobile Medical Camps",
      description:
        "Organizing free health check-ups, medicines and eye camps in remote rural areas.",
      progress: 40,
      raised: "₹4,00,000",
      goal: "₹10,00,000",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&w=800",
      category: "Food Security",
      title: "Mid-Day Meal Program",
      description:
        "Providing nutritious mid-day meals to school children to reduce dropout rates.",
      progress: 85,
      raised: "₹8,50,000",
      goal: "₹10,00,000",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      category: "Women Empowerment",
      title: "Skill Training for Women",
      description:
        "Vocational training and micro-enterprise support for rural women to achieve financial independence.",
      progress: 55,
      raised: "₹5,50,000",
      goal: "₹10,00,000",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800",
      category: "Environment",
      title: "Tree Plantation Drive",
      description:
        "Massive tree plantation to combat climate change and improve local environment.",
      progress: 92,
      raised: "₹9,20,000",
      goal: "₹10,00,000",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      category: "Digital Literacy",
      title: "Computer Education Program",
      description:
        "Providing computer education and internet access to rural youth.",
      progress: 30,
      raised: "₹3,00,000",
      goal: "₹10,00,000",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800",
      category: "Sanitation",
      title: "Toilet Construction Project",
      description:
        "Building household and community toilets to achieve open defecation free villages.",
      progress: 68,
      raised: "₹6,80,000",
      goal: "₹10,00,000",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      category: "Emergency Relief",
      title: "Disaster Relief Fund",
      description:
        "Immediate support during floods, cyclones and other natural calamities.",
      progress: 45,
      raised: "₹4,50,000",
      goal: "₹10,00,000",
    },
  ];

  /* ---------- Desktop Pagination ---------- */
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = allProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ---------- Mobile Slider ---------- */
  const [mobileIndex, setMobileIndex] = useState(0);

  const mobileNext = () => {
    setMobileIndex((prev) =>
      prev < allProjects.length - 1 ? prev + 1 : prev
    );
  };

  const mobilePrev = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-3">
              Our Initiatives
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Where your support goes
            </h3>
          </div>

          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700"
          >
            View all projects <LiaArrowRightSolid size={22} />
          </a>
        </div>

        {/* ================= Desktop Grid ================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* ================= Desktop Pagination ================= */}
        {totalPages > 1 && (
          <div className="hidden md:flex mt-12 justify-center items-center gap-4">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full font-medium ${
                    currentPage === page
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-400 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* ================= Mobile Slider ================= */}
        <div className="md:hidden mt-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
              }}
            >
              {allProjects.map((project) => (
                <div key={project.id} className="min-w-full px-1">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              onClick={mobilePrev}
              disabled={mobileIndex === 0}
              className="p-3 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>

            <span className="text-sm font-semibold text-black">
              {mobileIndex + 1} / {allProjects.length}
            </span>

            <button
              onClick={mobileNext}
              disabled={mobileIndex === allProjects.length - 1}
              className="p-3 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Mobile View All */}
        <div className="md:hidden mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-orange-600 font-bold"
          >
            View all projects <LiaArrowRightSolid />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
