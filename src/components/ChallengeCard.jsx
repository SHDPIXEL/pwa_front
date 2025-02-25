import { User, Swords } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ChallengeCard = ({ challenge }) => {
  const { weekId } = useParams(); 
  const navigate = useNavigate();

  let challengeImages = [];
  try {
    challengeImages = JSON.parse(challenge.challenge_images);
  } catch (error) {
    console.error("Error parsing challenge_images:", error);
  }

  return (
    <div className="bg-white rounded-2xl border border-black/15 shadow-sm mb-6 overflow-hidden flex items-center p-4">
      {/* Left Side: Image */}
      <img src={challengeImages.length > 0 ? challengeImages[0] : ""} 
      alt={challenge.name} className="w-24 h-24 object-cover rounded-lg mr-4" />

      {/* Right Side: Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900">{challenge.name}</h2>
          <div className="flex gap-2 items-center">
            {/* <span className="text-sm text-gray-500">{participants.toLocaleString()}</span> */}
            <User className="text-gray-500 w-4 h-4" />
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{challenge.shortDescription}</p>

        {/* Start Challenge Button */}
        <button
          onClick={() => navigate(`/challenges/week/${weekId}/${challenge.id}`, {
            state: { challenge } 
          })}
          className="w-full py-2 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90 bg-[#F7941C] active:bg-amber-600 flex items-center justify-center gap-2"
        >
          <span>Start</span>
          <Swords className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
