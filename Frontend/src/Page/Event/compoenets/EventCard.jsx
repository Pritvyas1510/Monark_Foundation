import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const EventCard = ({
  date,
  location,
  title,
  description,
  mediaUrl,
  organizedBy,
  mediaType,
  buttonText,
}) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-orange-200 hover:border-orange-500 transition-all hover:shadow-xl">
      {/* Media */}
      <div className="relative aspect-video overflow-hidden">
        {mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 "
          />
        ) : (
          <video
            src={mediaUrl}
            className="w-full h-full object-cover transition-transform duration-500"
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            muted
            loop
            playsInline
          />
        )}

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg shadow-md">
          <p className="text-[10px] font-bold uppercase text-orange-500">
            {organizedBy}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-orange-500 mb-3">
          <FaMapMarkerAlt className="text-sm" />
          <span className="text-xs font-bold uppercase tracking-tighter">
            {location}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-600 group-hover:text-orange-500 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-6 line-clamp-2">{description}</p>

        <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 border-b-2 border-orange-300 group-hover:border-orange-500 transition-all pb-1 cursor-pointer">
          {date}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
