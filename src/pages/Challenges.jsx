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

      <Header title={"Weekly Challenges"}/>
      
      <div className="px-4 py-4 pb-24">
        <h2 className='font-semibold text-lg pb-4 text-gray-700'>Strength and stability</h2>

        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ChallengesPage;