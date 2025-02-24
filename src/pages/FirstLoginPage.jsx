import { useState } from "react";
import { EllipsisVertical, User, LogOut, Copy, Check, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import brebootLogo from '../assets/images/Breboot.png'
import Lottie from "lottie-react";
import popperAnimations from "../assets/animations/popperAnimation.json";
import coin2 from "../assets/animations/coin2.json"
import coinAnimation from "../assets/animations/coin.json"
import redeem from "../assets/images/redeem-bg.png";
import brebootSvg from "../assets/svg/BrebootLogo.svg";
import coinSVG from "../assets/svg/Coin.svg"
import coin from "../assets/images/Coin.png"
import { ConsentModal } from "../components/Modal";
import useLogout from "../auth/Logout.Jsx";

const FirstLogin = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const user = localStorage.getItem("userType");

    const handleDropdown = () => setIsDropDownOpen(!isDropDownOpen);
    const handleLogout = () => setShowLogoutModal(true);

    const logout = useLogout();

    const handleCopy = () => {
        const textToCopy = "436756";

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(err => console.error("Clipboard API failed: ", err));
        } else {
            // Fallback for older browsers and iOS Safari
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "absolute";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Fallback copy failed: ", err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="min-h-screen">

            <div className="w-full bg-[#F7941C] text-white flex items-center justify-between py-4 text-sm px-4 z-50">
                <div className="flex items-center space-x-2 font-semibold">
                    <p> {user === "Dr" ? "Doctor" : user} </p>
                </div>
                <div
                    onClick={handleDropdown}
                    className="relative">

                    <div className="flex items-center w-14">
                        <button onClick={() => navigate("/redeem")} >
                            <img src={redeem} alt="redeem-logo" />
                        </button>
                        <button onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="focus:outline-none">
                            <EllipsisVertical className="w-6 h-5" />
                        </button>
                    </div>


                    {/* Dropdown Menu */}
                    {isDropDownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg rounded-tr-none overflow-hidden z-50">
                            <button
                                onClick={() => navigate("/profile")}
                                className="w-full text-left px-4 py-3 text-gray-700 active:bg-gray-100 flex items-center gap-2">
                                <User className="w-4 h-4" /> Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 text-gray-700 active:bg-gray-100 flex items-center gap-2">
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    )}

                    {showLogoutModal && (
                        <ConsentModal
                            onAction={logout}
                            title="Are you sure you want to log out?"
                            action="Logout"
                        />
                    )}
                </div>
            </div>


            <main className="flex flex-col items-center justify-center max-w-md mx-auto px-4 pt-12 pb-8">
                <div className="flex justify-center mb-10">
                    <img src={brebootSvg} alt="logo" className="h-24" />
                </div>

                <div className="text-center mb-15">
                    <h2 className="text-gray-600 font-medium mb-2">Welcome</h2>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Guddi!</h1>

                    {user === "Dr" && (
                        <div>
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 active:bg-gray-200 text-gray-600 transition-colors gap-2"
                            >
                                436756
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                            <p className="font-medium text-gray-900 pt-1">Your referral code</p>
                        </div>

                    )}

                </div>
                <div className="text-center">
                    <div>
                        {/* <Lottie
                            animationData={coin2}
                            loop={true}
                            autoplay={true}
                            style={{ height: 100, width: 100 }}
                        /> */}
                        <img
                         src={coin} 
                         alt="Coin-SVG"
                         className="w-20 h-auto"
                         />
                    </div>
                </div>

                <div className="rounded-lg text-3xl font-semibold  p-3 text-center text-[#F7941C]">
                    <p>You have earned  </p>
                    <p>500 Points!</p>
                </div>

                <button
                    onClick={() => navigate("/welcome")}
                    className="flex items-center justify-center gap-3 border w-40 mt-5 border-[#F7941C] active:bg-amber-600/30 bg-amber-600/20 text-gray-700 font-semibold px-3 py-2 rounded-xl">
                    <div>
                        Continue
                    </div>
                    <div>
                        <MoveRight />
                    </div>
                </button>
            </main>

            {/* {showLogoutModal && (
                <ConsentModal
                    onAction={logout}
                    title="Are you sure you want to log out?"
                    action="Logout"
                />
            )} */}
        </div>
    );
};

export default FirstLogin;