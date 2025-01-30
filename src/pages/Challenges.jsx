import React from 'react';
import ChallengeCard from '../components/ChallengeCard';
import {BottomNavBar} from '../components/BottomNavBar';
import Header from '../components/Header';


const challenges = [
  {
    id: 1,
    category: 'Fitness & Nutrition',
    title: '10,000 Steps Daily',
    description: 'Walk 10,000 steps every day for a month.',
    progress: 40,
    participants: 1234,
  },
  {
    id: 2,
    category: 'Fitness & Nutrition',
    title: 'Healthy Eating',
    description: 'Eat at least 5 servings of fruits and vegetables daily.',
    progress: 20,
    participants: 856,
  },
];

const ChallengeCategory = ["Fitness","Nutrition","Mindfulness"]

const ChallengesPage = () => {
  return (
    <div className="min-h-screen poppins-regular">

      <Header title={"Challenges"}/>
      
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
          <button 
            className="px-4 py-1 rounded-full text-white text-sm whitespace-nowrap bg-[#F7941C]"
          >
            All Challenges
          </button>
          <button className="px-4 py-1 rounded-full bg-white text-gray-600 text-sm whitespace-nowrap border border-gray-200">
            Fitness
          </button>
          <button className="px-4 py-1 rounded-full bg-white text-gray-600 text-sm whitespace-nowrap border border-gray-200">
            Nutrition
          </button>
          <button className="px-4 py-1 rounded-full bg-white text-gray-600 text-sm whitespace-nowrap border border-gray-200">
            Mindfulness
          </button>
        </div>

        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ChallengesPage;