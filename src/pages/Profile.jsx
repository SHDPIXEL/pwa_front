import React, { useState } from "react";
import Header from "../components/Header";
import { UserPen, Copy, Check, Mail, Phone, User, Camera, LogOut, Key } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
    const location = useLocation();
    const isDoctor = location.state?.activeTab === "Dr" ? true : false;
    const [copied, setCopied] = React.useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Dr. Sarah Wilson",
        phone: "+91 6787656787",
        email: "sarah@example.com",
        doctorCode: "DR123456",
        bio: "Specialized in nutrition and wellness. Helping people achieve their health goals for over 10 years.",
    });
    
    const navigate = useNavigate();

    const handleUpdate = () => {
        setIsEditing(false);
    };

    const handleCopy = () => {
        const textToCopy = "DR123456";

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
        <div className="min-h-[100dvh] flex flex-col bg-gray-50">
            <Header
                title="Profile"
                icon={<UserPen className="w-6 h-6" />}
                onAction={() => setIsEditing(!isEditing)}
            />

            <div className="flex-1">
                {/* Profile Header Section */}
                <div className="bg-white pb-10">
                    <div className="h-32 bg-[#F7941C] " />
                    <div className="px-4 -mt-16">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 bg-white rounded-2xl p-1">
                                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                                    <User className="w-16 h-16 text-gray-400" />
                                    {/* {isEditing && (
                    <button className="absolute bottom-2 right-2 bg-[#F7941C] p-2 rounded-full">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Info Section */}
                <div className="px-4 -mt-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="space-y-6">
                            {/* Name Section */}
                            <div>
                                <label className="text-sm text-gray-500 mb-1 block">Name</label>
                                <input
                                    type="text"
                                    className={`w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 ${isEditing ? "text-black" : "text-gray-500"}`}
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>

                            {isDoctor && (
                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                                        <Key className="w-4 h-4" />
                                        <span className="text-sm">Doctor Code</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20"
                                            value={profileData.doctorCode}
                                            disabled
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                        >
                                            {copied ? (
                                                <Check className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <Copy className="w-5 h-5 text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Bio Section */}
                            {/* <div>
                <label className="text-sm text-gray-500 mb-1 block">Bio</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 resize-none"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                />
              </div> */}

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm">Phone Number</span>
                                    </div>
                                    <input
                                        type="tel"
                                        className={`w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 ${isEditing ? "text-black" : "text-gray-500"}`}
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">Email</span>
                                    </div>
                                    <input
                                        type="email"
                                        className={`w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 ${isEditing ? "text-black" : "text-gray-500"}`}
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                        </div>

                        {!isEditing && <div className="mt-8">
                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-2 px-4 rounded-xl text-white font-medium transition-colors bg-[#F7941C] active:bg-amber-600"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <div>LogOut</div>
                                    <div>
                                        <LogOut className="w-4 h-4" />
                                    </div>
                                </div>
                            </button>
                        </div> 
                        }

                        {/* Save Button */}
                        {isEditing && (
                            <div className="mt-8">
                                <button
                                    onClick={handleUpdate}
                                    className="w-full bg-[#F7941C] text-white py-2 px-4 rounded-xl font-medium active:bg-amber-600 transition-colors"
                                >
                                    Update
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;