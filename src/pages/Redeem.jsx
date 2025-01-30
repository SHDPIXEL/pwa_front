import React from 'react';
import { ChevronRight, Gift } from 'lucide-react';
import { BottomNavBarMemberProgram } from '../components/BottomNavBar';
import { CategoryCard } from '../components/cards';
import Header from '../components/Header';
import dumy_1 from "../assets/images/dumy_1.jpg";

// Mock data for rewards
const categories = [
  { id: 1, title: 'Vouchers', icon: '🎫' },
  { id: 2, title: 'Products', icon: '🎁' },
  { id: 3, title: 'Services', icon: '✨' },
  { id: 4, title: 'Events', icon: '🎉' },
];

const popularRewards = [
  {
    id: 1,
    title: '$10 Shopping Voucher',
    points: 1000,
    image: dumy_1,
    validity: '30 days',
    claimed: 1234,
  },
  {
    id: 2,
    title: 'Free Skincare Sample',
    points: 500,
    image: dumy_1,
    validity: '14 days',
    claimed: 856,
  },
  {
    id: 3,
    title: 'Beauty Workshop Pass',
    points: 2000,
    image: dumy_1,
    validity: '60 days',
    claimed: 432,
  },
];

const exclusiveRewards = [
  {
    id: 1,
    title: 'VIP Beauty Box',
    points: 5000,
    image: dumy_1,
  },
  {
    id: 2,
    title: 'Annual Membership',
    points: 8000,
    image: dumy_1,
  },
];

// Reward Card Component
const RewardCard = ({ title, points, image, validity, claimed, type }) => (
  <div className="bg-white rounded-2xl shadow-sm group hover:shadow-md transition-all duration-300 cursor-pointer">
    <div className="flex gap-3 p-3">
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 line-clamp-2 text-sm mb-1">{title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm font-bold text-[#F7941C]">{points.toLocaleString()}</span>
          <span className="text-xs text-gray-500">points</span>
        </div>
        {validity && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Valid for {validity}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{claimed} claimed</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const UserPoints = () => (
  <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 mb-1">Available Points</p>
        <p className="text-2xl font-bold text-[#F7941C]">2,500</p>
      </div>
      <button 
        className="px-4 py-2 rounded-xl text-white text-sm bg-[#F7941C] active:bg-amber-600"
      >
        History
      </button>
    </div>
  </div>
);

const RedeemPage = () => {
  return (
    <div className="min-h-screen text-gray-900 font-poppins">
      <Header title="Redeem Rewards" />
      
      <div className="px-4 py-4 pb-24">
        <UserPoints />
        
        {/* Categories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reward Categories</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>

        {/* Popular Rewards */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Popular Rewards</h2>
            <button className="flex items-center text-sm text-[#F7941C]">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {popularRewards.map((reward) => (
              <RewardCard key={reward.id} {...reward} />
            ))}
          </div>
        </div>

        {/* Exclusive Rewards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Exclusive Rewards</h2>
            <button className="flex items-center text-sm text-[#F7941C]">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {exclusiveRewards.map((reward) => (
              <RewardCard key={reward.id} {...reward} />
            ))}
          </div>
        </div>
      </div>

      <BottomNavBarMemberProgram />
    </div>
  );
};

export default RedeemPage;