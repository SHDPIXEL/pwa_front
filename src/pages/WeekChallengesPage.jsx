import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ChallengeCard from "../components/ChallengeCard";
import steps from "../assets/images/steps.png";

const allChallenges = {
  1: [
    { id: 1, title: "10,000 Steps Daily", description: "Walk 10,000 steps daily.", participants: 1234, challengeImage: steps },
  ],
  2: [
    { id: 3, title: "Healthy Eating", description: "Eat 5 servings of fruits/vegetables daily.", participants: 856, challengeImage: steps },
    { id: 4, title: "Morning Meditation", description: "Meditate for 10 minutes each morning.", participants: 645, challengeImage: steps },
  ],
};

const WeekChallengesPage = () => {
  const { weekId } = useParams();
  const challenges = allChallenges[weekId] || [];

  return (
    <div className="min-h-screen poppins-regular">
      <Header title={`Challenges for Week ${weekId}`} />
      <div className="px-4 py-4 pb-24">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No challenges found for this week.</p>
        )}
      </div>
    </div>
  );
};

export default WeekChallengesPage;
