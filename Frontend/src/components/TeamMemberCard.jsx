import { SiMailboxdotorg } from "react-icons/si";

const TeamMemberCard = ({ image, name, position, bio, email }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800 aspect-[4/5]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-110 lg:grayscale lg:group-hover:grayscale-0"
        />

        {/* Overlay: always visible on mobile/tablet, hover-reveal on desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                     opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                     transition-opacity duration-300 flex items-end p-6"
        >
          <div className="flex gap-4">
            {email && (
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Contact from Monark Foundation`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Email ${name}`}
                className="text-white transition-transform hover:scale-110"
              >
                <SiMailboxdotorg size={24} />
              </a>
            )}
          </div>
        </div>
      </div>

      <h4 className="text-xl font-bold text-text-main dark:text-gray-800 lg:group-hover:text-primary transition-colors">
        {name}
      </h4>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {position}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
        {bio}
      </p>
    </div>
  );
};

export default TeamMemberCard;