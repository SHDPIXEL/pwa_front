import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import { BottomNavBar } from "../components/BottomNavBar";
import api from "../utils/Api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";


const ChallengesPage = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChallengs = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/user/weeks");
        setWeeks(response.data)
        console.log(response.data)
      } catch (error) {
        toast.error("Error in fetching challenges", error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchChallengs();
  }, [])

  return (
    <div className="min-h-screen poppins-regular">
      <Header title="Weekly Challenges" />
      <div className="px-4 py-4 pb-24">
        <h2 className="font-semibold text-lg pb-4 text-gray-700">Select a Week</h2>
        {
          isLoading ? <Loader /> : <div>
            {weeks.map((week) => (
              <div
                key={week.id}
                className="bg-white rounded-2xl border border-black/15 shadow-sm mb-6 p-4 cursor-pointer hover:bg-gray-100 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{week.name}</h3>
                  <span className="text-sm text-gray-500">{week.progress}% Completed</span>
                </div>
                {/* Progress Bar */}
                <ProgressBar progress={week.progress} />

                {/* Join Button */}
                <button
                  onClick={() => navigate(`/challenges/week/${week.id}`, { state: { weekName: week.name } })}
                  className="w-full mt-6 py-2 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90 bg-[#F7941C] active:bg-amber-600"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div>Join Weekly Challenges</div>
                    {/* <div>
                  <Swords className="w-4 h-4" />
                </div> */}
                  </div>
                </button>
              </div>
            ))}
          </div>
        }
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ChallengesPage;
