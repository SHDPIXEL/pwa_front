import { HomeIcon, Dumbbell, Settings, Gift, TicketCheck } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';


const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 pb-8 left-0 right-0 bg-white shadow-lg border-t border-gray-100">
      <div className="flex justify-around items-center p-3 max-w-md mx-auto">
        <Link to={"/welcome"}>
          <button className="flex flex-col items-center text-gray-400">
            <HomeIcon size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
        </Link>
        <button className="flex flex-col items-center text-[#F7941C] active:text-amber-600">
          <Dumbbell size={20} />
          <span className="text-xs mt-1">Challenges</span>
        </button>
      </div>
    </div>
  );
};

const BottomNavBarMemberProgram = () => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 pb-8 left-0 right-0 bg-white shadow-lg border-t border-gray-100">
      <div className="flex justify-around items-center p-3 max-w-md mx-auto">

        <button
        onClick={() => navigate("/welcome")}
        className="flex flex-col items-center text-gray-400">
          <HomeIcon size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button 
        onClick={() => navigate("/memberprogram")}
        className={`flex flex-col items-center ${
          location.pathname === "/memberprogram" ? "text-[#F7941C]" : "text-gray-400"
        }`}>
          <Gift size={20} />
          <span className="text-xs mt-1">Member</span>
        </button>

        <button
          onClick={() => {
            navigate('/redeem')
          }}
          className={`flex flex-col items-center ${
            location.pathname === "/redeem" ? "text-[#F7941C]" : "text-gray-400"
          }`}>
          <TicketCheck size={20} />
          <span className="text-xs mt-1">Redeem</span>
        </button>

      </div>
    </div>
  )
}

export { BottomNavBar, BottomNavBarMemberProgram };