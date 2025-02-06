import { useEffect, useState } from "react";
import { ChevronLeft, EllipsisVertical, User, LogOut, Copy, Check } from "lucide-react";
import profile from "../assets/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import brebootLogo from "../assets/images/Breboot.png";
import ConsentModal from "../components/Modal";

const Welcome = () => {

    const [showModal, setShowModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const user = localStorage.getItem("userType");


    const handleConsent = (accepted) => {
        setShowModal(false);
        if (accepted) {
            navigate("/challenges");
        }
    };

    const handleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen)
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    }

    const handleModalAction = (confirm) => {
        setShowLogoutModal(false);
        if (confirm) {
            navigate("/");
        }
    };

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
        <div className="min-h-[100dvh] flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-[#F7941C] text-white flex items-center justify-between py-4 text-sm px-4 z-50">
                <div className="flex items-center space-x-2 font-semibold">
                    <p> {user === "Dr" ? "Doctor" : user} </p>
                </div>
                <div
                    onClick={handleDropdown}
                    className="relative">
                    <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
                        <EllipsisVertical className="w-4 h-5" />
                    </button>

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
                            onAction={handleModalAction}
                            title="Are you sure you want to log out?"
                            action="Logout"
                        />
                    )}
                </div>
            </div>

            {/* Logo */}
            <div className="text-center mt-5">
                <img src={brebootLogo} alt="logo" className="w-auto h-10" />
            </div>

            {/* Profile Icon */}
            <div className="mt-3 mb-3 rounded-full overflow-hidden">
                <img src={profile} className="w-24 h-24 text-gray-500" alt="profile-icon" />
            </div>

            {/* Welcome Text */}

            <h2 className="text-lg font-bold">Welcome back</h2>
            <p className="text-4xl text-black font-bold ">Guddi !</p>
            {user === "Dr" && <div className="text-center">
                <button
                    onClick={handleCopy}
                    className="flex items-center justify-center mt-3 bg-gray-100 active:bg-gray-200 text-gray-600 py-1 rounded-xl w-full gap-3 px-5">
                    <p>436756</p>
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>}
            <p className="font-medium text-gray-900 pt-1">Your referral code</p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-5 mt-5 w-full px-6">
                {/* Action 1 - Challenge (Triggers Modal) */}
                {user === "Dr" && <button onClick={() => setShowModal(true)}>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 flex items-center justify-center bg-[#F7941C] text-white rounded-full">
                            <User className="w-10 h-10" />
                        </div>
                        <p className="mt-2 text-base text-gray-500">#B-reboot Challenge</p>
                    </div>
                </button>}

                {/* Action 2 - Member Program */}
                <Link to={"/memberprogram"}>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 flex items-center justify-center bg-[#F7941C] text-white rounded-full">
                            <User className="w-10 h-10" />
                        </div>
                        <p className="mt-2 text-base text-gray-500">Privileged Member</p>
                        <p className="text-base text-gray-500">Program</p>
                    </div>
                </Link>

                {/* Action 3 - Free Diet Consultation */}
                <Link to={"/dietconsultation"}>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 flex items-center justify-center bg-[#F7941C] text-white rounded-full">
                            <User className="w-10 h-10" />
                        </div>
                        <p className="mt-2 text-base text-gray-500">Celebrity Diet</p>
                        <p className="text-base text-gray-500">Consultation</p>
                    </div>
                </Link>
            </div>

            {/* Consent Modal */}
            {showModal && <ConsentModal title={"Consent Required"} subtitleOne={"By joining weekly challenges in the Breboot app, you consent to the app accessing your submitted photos and videos, which will remain confidential and not be shared without your permission"} onAction={handleConsent} action={"Accept & Continue"} />}
        </div>
    );
};

export default Welcome;
