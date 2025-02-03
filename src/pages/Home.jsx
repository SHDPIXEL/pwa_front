import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import { ChevronLeft, EllipsisVertical, ChevronDown } from "lucide-react";
import facebook from "../assets/images/facebook_logo.png";
import apple from "../assets/images/apple_logo.png";
import google from "../assets/Google_logo.svg";
import { useNavigate } from "react-router-dom";
import brebootLogo from "../assets/images/Breboot.png";

const Home = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isSplashVisible ? (
                <SplashScreen />
            ) : (
                <div className="min-h-[100dvh] flex flex-col bg-white overflow-hidden"> 
                {/* Header */}
                    <div className="w-full bg-[#F7941C] text-white flex items-center justify-between py-4 text-sm px-4 z-50"></div>

                    {/* Main Content */}
                    <div className="max-w-md mx-auto px-10 pt-16 flex flex-col">
                        {/* Logo and Title */}
                        <div className="flex flex-col items-center mb-6">
                            <img src={brebootLogo} alt="logo" className="w-auto h-16 mb-16" />
                            <h2 className="text-xl font-bold text-gray-800">Let's create your account</h2>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-6 mb-4 text-sm flex flex-col items-center">
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                                <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                                    <span className="text-gray-700 font-semibold">Dr.</span>
                                    <ChevronDown className="w-4 h-4 stroke-1" />
                                </div>
                                <input
                                    className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                                <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                                    <span className="text-gray-700 font-semibold">+91</span>
                                    <ChevronDown className="w-4 h-4 stroke-1" />
                                </div>
                                <input
                                    className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                                    type="text"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                              {/* WhatsApp Checkbox */}
                        <label className="flex items-center gap-3 mb-8 cursor-pointer">
                            <input 
                            type="checkbox"
                            checked={checked}
                            onChange={() => {setChecked(!checked)}}
                            className="hidden"
                            />
                            <div className={`w-3 h-3 rounded-full border-1 border-[#F7941C] flex items-center justify-center transition-all`}>
                               {checked && <div className="w-1 h-1 rounded-full bg-[#F7941C]"></div> }
                            </div>
                            <span className="text-xs text-gray-600">
                                Receive updates and reminders on WhatsApp
                            </span>
                        </label>

                        </div>

                      

                        {/* Continue Button */}
                        <button
                            onClick={() => navigate("/welcome")}
                            className="w-full bg-black text-white py-3 rounded-xl mb-4 hover:opacity-90 transition-opacity"
                        >
                            Continue
                        </button>

                        {/* Divider */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <span className="text-gray-500 font-medium text-xs">or continue with</span>
                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        {/* Email Button */}
                        <button className="w-full text-gray-700 border-1 border-gray-400 py-3 rounded-xl mb-8 hover:opacity-90 transition-opacity">
                            E-mail Address
                        </button>

                        {/* Social Login */}
                        <div className="flex justify-center gap-8 mb-8">
                            <button>
                                <img className="w-5 h-6" src={apple} alt="apple-logo" />
                            </button>
                            <button >
                                <img className="w-6 h-6" src={google} alt="google-logo" />
                            </button>
                            <button >
                                <img className="w-6 h-6" src={facebook} alt="facebook-logo" />
                            </button>
                        </div>

                        {/* Terms */}
                        <p className="text-center text-xs text-gray-500 px-6 mb-10">
                            By signing up I agree to the Terms of Services and Privacy Policy, including usage of cookies
                        </p>
                        <p className="text-center text-xs px-6 text-[#F7941C] font-semibold tracking-wide">Already a user ?</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;