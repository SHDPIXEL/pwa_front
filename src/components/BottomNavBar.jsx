import { HomeIcon, Dumbbell, History, Gift } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

// Unified BottomNavBar component with active tab feature
const BottomNavBar = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define navigation items based on variant
  const navItems = variant === "memberProgram" ? [
    { path: "/welcome", icon: HomeIcon, label: "Home" },
    { path: "/memberprogram", icon: Gift, label: "Member" }
  ] : [
    { path: "/welcome", icon: HomeIcon, label: "Home" },
    { path: "/challenges", icon: Dumbbell, label: "Challenges" },
    { path: "/history", icon: History, label: "History" }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100">
      <div className="flex justify-around items-center p-3 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center ${
              currentPath === item.path ? "text-[#F7941C]" : "text-gray-400"
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// For backward compatibility, export the original component names
const BottomNavBarMemberProgram = () => <BottomNavBar variant="memberProgram" />;

export { BottomNavBar, BottomNavBarMemberProgram };