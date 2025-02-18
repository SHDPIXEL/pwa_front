import { useEffect, useState } from "react";
// import breebootLogo from "../assets/images/Breboot.png"
import brebootSvg from "../assets/svg/BrebootLogo.svg";



const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const finishTimer = setTimeout(() => onFinish && onFinish(), 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-between bg-white transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* Centered Logo */}
      <div className="flex flex-1 items-center justify-center">
        <img src={brebootSvg} alt="Logo" className="w-52" />
      </div>

    </div>
  );
};

export default SplashScreen;
