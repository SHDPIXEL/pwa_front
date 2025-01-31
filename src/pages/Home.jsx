import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import { ChevronLeft, EllipsisVertical, ChevronDown } from "lucide-react";
import facebook from "../assets/images/facebook_logo.png";
import apple from "../assets/images/apple_logo.png"
import google from "../assets/Google_logo.svg"
import { useNavigate } from "react-router-dom";
import brebootLogo from "../assets/images/Breboot.png"

const Home = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 2500);
        return () => clearTimeout(timer); // Cleanup function
    }, []);

    return (
        <>
            {isSplashVisible ? (
                <SplashScreen />
            ) : (
                <div className="min-h-[100dvh] bg-gray-100">
                    {/* Header Overlapping Notch */}
                    <div
                        className="w-full bg-[#F7941C] text-white flex items-center justify-between py-6 text-sm px-4 z-50">
                        <div className="flex items-center space-x-2">
                            <ChevronLeft className="w-4 h-4" />
                            <p>Doctor</p>
                        </div>
                        <div className="uppercase flex items-center space-x-2">
                            <p>Already a user?</p>
                            <EllipsisVertical className="w-4 h-5" />
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="px-4 flex flex-col items-center gap-10">
                        <div className="flex flex-col space-y-10 items-center justify-center pt-15">
                            {/* <h1 className="font-semibold text-[#F7941C] text-6xl">
                                B
                                <span className="text-black">reb</span>
                                oo
                                <span className="text-black">t</span>
                            </h1> */}
                            <img 
                            src={brebootLogo} 
                            alt="logo"
                            className="w-auto h-20"
                            />
                            <h2 className="font-bold capitalize text-sm">Let's create your account</h2>

                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex items-center gap-2 px-6">
                                <label htmlFor="DR" className="font-semibold w-12">Dr.</label>
                                <ChevronDown className="w-6 h-6 stroke-0 fill-black" />
                                <input
                                    className="border border-gray-400 w-full rounded-2xl text-sm px-3 py-1"
                                    type="text" />
                            </div>
                            <div className="flex items-center gap-2 px-6">
                                <label htmlFor="number" className="font-semibold w-12">+91</label>
                                <ChevronDown className="w-6 h-6 stroke-0 fill-black" />
                                <input
                                    className="border border-gray-400 w-full rounded-2xl text-sm px-3 py-1"
                                    type="text" />
                            </div>
                        </div>

                        <div className="flex items-center px-6 gap-5">
                            <div className="flex items-center justify-center h-4 w-4 rounded-full border border-gray-400">
                                <div className="h-2 w-2 rounded-full bg-[#F7941C]" />
                            </div>
                            <div className="text-xs">
                                Receive updates and reminders on whatsapp
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-7">
                            <div className="bg-black rounded-full text-white flex items-center justify-center w-50 py-1">
                                <button onClick={() => {
                                    navigate("/welcome")
                                }}>Continue</button>
                            </div>

                            <div className="font-bold capitalize">
                                or continue with
                            </div>

                            <div className="bg-black rounded-full text-white flex items-center justify-center w-50 py-1">
                                <button>E-mail Address</button>
                            </div>
                        </div>

                        <div className="flex items-center">
                                <div className="px-5 border-r-1 border-gray-300">
                                    <img className="w-5 h-auto" src={apple} alt="apple-logo" />
                                </div>
                                <div className="px-5 border-r-1 border-gray-300">
                                    <img className="w-6 h-auto" src={google} alt="google-logo" />
                                </div>
                                <div className="px-5 border-r-1 border-gray-300">
                                    <img className="w-6 h-auto" src={facebook} alt="facebook-logo" />
                                </div>
                        </div>

                        <p className="text-gray-500 text-[7px]">By signing up I agree to the Terms of Services and privacy Policy, including usage of cookies </p>

                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
