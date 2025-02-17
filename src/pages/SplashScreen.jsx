import { useEffect, useState } from "react";
import brebootLogo from "../assets/Breboot.svg";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 2000);
    setTimeout(() => onFinish && onFinish(), 2500);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img src={brebootLogo} alt="Logo" className="h-96 w-96 mb-4" />
      {/* <h1 className="absolute top-[55%] text-2xl font-medium text-center poppins-regular">
        <span className="font-bold">B{" "}</span> 
        <span className="font-bold">R</span>eady{" "}
        <span>{" "}to{" "}</span>
        <span className="font-bold">R</span>eboot{" "}
        <span>y</span>our{" "}
        <span className="font-bold">B</span>ody
      </h1> */}
    </div>
  );
};

export default SplashScreen;
