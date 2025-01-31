import { ChevronLeft, EllipsisVertical, User } from "lucide-react";
import profile from "../assets/images/profile.jpg"
import { Link } from "react-router-dom";
import brebootLogo from "../assets/images/Breboot.png"

const Welcome = () => {
    return (
        <div className="min-h-[100dvh] bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-[#F7941C] text-white flex items-center justify-between py-6 text-sm px-4 z-50">
                <div className="flex items-center space-x-2">
                    <ChevronLeft className="w-4 h-4" />
                    <p>Doctor</p>
                </div>
                <div className="uppercase flex items-center space-x-2">
                    <p>Already a user?</p>
                    <EllipsisVertical className="w-4 h-5" />
                </div>
            </div>

            {/* Logo */}
            <div className="text-center mt-5">
                {/* <h1 className="font-semibold text-[#F7941C] text-3xl">
                    B<span className="text-black">reb</span>oo<span className="text-black">t</span>
                </h1> */}
                <img
                    src={brebootLogo}
                    alt="logo"
                    className="w-auto h-10"
                />
            </div>

            {/* Person Icon */}
            <div className="mt-3 rounded-full overflow-hidden">
                <img src={profile} className="w-24 h-24 text-gray-500" alt="profile-icon" />
            </div>

            {/* Welcome Text */}
            <div className="text-center mt-6">
                <h2 className="text-lg font-bold">Welcome back</h2>
                <p className="text-4xl text-black font-bold">Guddi !</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-5 mt-10 w-full px-6">
                {/* Action 1 */}
                <Link to={"/challenges"}>
                    <div className="flex flex-col items-center">
                        <div className="w-25 h-25 flex items-center justify-center bg-[#F7941C] text-white rounded-full">
                            <User className="w-10 h-10" />
                        </div>
                        <p className="mt-2 text-base text-gray-500">#B-reboot Challenge</p>
                    </div>
                </Link>

                {/* Action 2 */}
                <Link to={"/memberprogram"}>
                    <div className="flex flex-col items-center">
                        <div className="w-25 h-25 flex items-center justify-center bg-[#F7941C] text-white rounded-full">
                            <User className="w-10 h-10" />
                        </div>
                        <p className="mt-2 text-base text-gray-500">Privilefe Member</p>
                        <p className="text-base text-gray-500">Program</p>
                    </div>
                </Link>

                {/* Action 3 */}
                <div className="flex flex-col items-center">
                    <div className="w-25 h-25 flex items-center justify-center bg-[#F7941C] text-white rounded-full">
                        <User className="w-10 h-10" />
                    </div>
                    <p className="mt-2 text-base text-gray-500">Free Diet</p>
                    <p className="text-base text-gray-500">Consultation</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
