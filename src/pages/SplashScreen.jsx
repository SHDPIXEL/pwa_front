import { useEffect, useState } from "react";
import brebootLogo from "../assets/Breboot.svg"

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 2000);
    setTimeout(() => onFinish && onFinish(), 2500);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-white flex flex-col items-center justify-center transition-opacity duration-500 poppins-regular ${
      fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}>
      <img src={brebootLogo} alt="Logo" className="mb-4 h-96 w-96" />
    </div>
  );
};

export default SplashScreen;