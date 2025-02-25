import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import ChallengeCard from "../components/ChallengeCard";
import api from "../utils/Api";

const WeekChallengesPage = () => {
  const { weekId } = useParams();
  const [allChallenges, setAllChallenges] = useState([]);

  const location = useLocation();
  const weekName = location.state?.weekName || "Week";


  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get(`/user/challenges/${weekId}`);
        setAllChallenges(response.data);
        console.log("Challenges Data:", response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, [weekId]); // Add `weekId` as a dependency to re-fetch on changes

  return (
    <div className="min-h-screen poppins-regular">
      <Header title={`Challenges for ${weekName}`} />
      <div className="px-4 py-4 pb-24">
        {allChallenges.length > 0 ? (
          allChallenges.map((challenge) => {
            let challengeImages = [];

            try {
              challengeImages = JSON.parse(challenge.challenge_images); 
            } catch (error) {
              console.error("Error parsing challenge_images:", error);
            }

            return (
              <ChallengeCard
                key={challenge.id}
                // title={challenge.name}
                // id={challenge.id}
                // description={challenge.shortDescription}
                // challengeImage={challengeImages.length > 0 ? challengeImages[0] : ""}
                challenge={challenge}
              />
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No challenges found for this week.</p>
        )}

      </div>
    </div>
  );
};

export default WeekChallengesPage;
