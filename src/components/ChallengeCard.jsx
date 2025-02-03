import { User, Swords } from "lucide-react";
import { Link } from "react-router-dom";

const ChallengeCard = ({ title, description, participants }) => {
  return (
    <div className="bg-white rounded-2xl border border-black/15 shadow-sm mb-6 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-500">{participants.toLocaleString()}</div>
            <User className="text-gray-500 w-4 h-4" />
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <Link to={"/challenges/details"}>
        <button
          className="w-full py-2 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90 bg-[#F7941C] active:bg-amber-600">
            <div className="flex items-center justify-center gap-2">
              <div>Start Challenge</div>
              <div><Swords className="w-4 h-4"/></div>              
            </div>
        </button>
        </Link>
      </div>
    </div>
  );
};
export default ChallengeCard;
