import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideBackButton = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 poppins-regular flex flex-col justify-between">
      {/* Main Container */}
      <div className="max-w-md mx-auto w-full bg-white shadow-md min-h-screen">
        <Outlet />
      </div>
      {/* Back Button */}
      <div className="max-w-md">
        {!hideBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="fixed bottom-7 left-15 transform -translate-x-1/2 bg-[#F7941C] text-white text-sm p-4 rounded-full flex items-center gap-1 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Layout;
