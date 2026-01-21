// src/components/ProjectCard.jsx
const ProjectCard = ({ image, category, title, description, progress, raised, goal }) => {
  return (
    <article className="group flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 border border-gray-200 dark:border-white/10">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all z-10" />

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-bold bg-white text-gray-900 rounded-full shadow">
            {category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-2 bg-white text-orange-600 font-bold text-sm rounded shadow hover:bg-gray-100 transition-colors">
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {title}
        </h4>

        <p className="text-gray-700 mb-6 flex-1 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide text-gray-500">
            <span>Progress</span>
            <span className="text-orange-600">{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full relative transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-900">{raised}</span>
            <span className="text-gray-500">Goal: {goal}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
