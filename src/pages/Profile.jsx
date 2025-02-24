import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { UserPen, Copy, Check, Mail, Phone, User, LogOut, Key, Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConsentModal } from "../components/Modal";
import { useUser } from "../context/userContext";
import api from "../utils/Api";
import toast from "react-hot-toast";
import useLogout from "../auth/Logout.Jsx";

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userData, setUserData, loading } = useUser();
  const user = localStorage.getItem("userType");
  const navigate = useNavigate();
  const logout = useLogout();


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    doctorCode: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "", 
        phone: userData.phone || "",
        email: userData.email || "",
        doctorCode: userData.code || "",
      });
    }
  }, [userData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put("/user/updateprofile", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      if (response.status === 200) {
        setUserData((prev) => ({
          ...prev,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  const handleLogoutConfirm = () => {
    setIsModalOpen(true);
  };

  const handleModalAction = (confirm) => {
    setIsModalOpen(false);
    if (confirm) {
      logout();
    }
  };

  const handleCopy = () => {
    const textToCopy = formData.doctorCode;
    if (!textToCopy) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Clipboard API failed: ", err));
    } else {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gray-50">
      <Header
        title="Profile"
        icon={<UserPen className="w-6 h-6" />}
        onAction={() => setIsEditing(!isEditing)}
      />

      <div className="flex-1">
        <div className="pb-10">
          <div className="h-32 bg-[#F7941C]" />
          <div className="px-4 -mt-16">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-white rounded-2xl p-1">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 -mt-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 mb-1">Available Points</p>
              <div className="flex items-center justify-center">
                <Dot className="text-[#F7941C]" />
                <p className="text-xl font-bold text-[#F7941C]">{userData.points || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Name</label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 ${
                    isEditing ? "text-black" : "text-gray-500"
                  }`}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              {user === "Dr" && (
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Key className="w-4 h-4" />
                    <span className="text-sm">Doctor Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20"
                      value={formData.doctorCode}
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

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Phone Number</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className={`w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 ${
                      isEditing ? "text-black" : "text-gray-500"
                    }`}
                    value={formData.phone}
                    onChange={handleInputChange}
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
                    name="email"
                    className={`w-full px-3 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 ${
                      isEditing ? "text-black" : "text-gray-500"
                    }`}
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {!isEditing && (
              <div className="mt-8">
                <button
                  onClick={handleLogoutConfirm}
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
            )}

            {isModalOpen && (
              <ConsentModal
                onAction={handleModalAction}
                title="Are you sure you want to log out?"
                action="Logout"
              />
            )}

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