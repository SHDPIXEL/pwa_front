const ChallengeCard = ({ title, description, progress, participants }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">{participants.toLocaleString()} joined</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="relative w-full bg-gray-100 h-2 rounded-full mb-4">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: '#F7941C' }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>{progress}% Complete</span>
        </div>
        <button 
          className="w-full py-2 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90 bg-[#F7941C] active:bg-amber-600">
          Join Challenge
        </button>
      </div>
    </div>
  );
};
export default ChallengeCard;
