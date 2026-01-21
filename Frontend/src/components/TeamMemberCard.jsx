import { SiMailboxdotorg } from "react-icons/si";
import { BsLink } from "react-icons/bs";

const TeamMemberCard = ({ image, name, position, bio }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800 aspect-[4/5]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined"><BsLink size={24}/></span>
            </a>
            <a href="#" className="text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined"><SiMailboxdotorg size={24}/></span>
            </a>
          </div>
        </div>
      </div>
      <h4 className="text-xl font-bold text-text-main dark:text-gray-800 group-hover:text-primary transition-colors">
        {name}
      </h4>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{position}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{bio}</p>
    </div>
  );
};

export default TeamMemberCard;