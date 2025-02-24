import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import { useNavigate } from "react-router-dom";
import brebootSvg from "../assets/svg/BrebootLogo.svg";
import { FormModal } from "../components/Modal";
import api from "../utils/Api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [checked, setChecked] = useState(true);
  const [activeTab, setActiveTab] = useState("Dr");
  const [gender, setGender] = useState("female");
  const [registerWithPhone, setRegisterWithPhone] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    referralCode: "",
    otp: "",
    password: "",
    gender: gender,
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("userType", activeTab)
  },[activeTab])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Global form data handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setFormData(prevData => ({
      ...prevData,
      gender: newGender, // Ensure formData is updated
    }));
  };


  const handleRegister = async () => {
    if (!formData.name) {
      toast.error("Please enter your name");
      return;
    }

    if (registerWithPhone) {
      if (!formData.phone) {
        toast.error("Please enter your phone number");
        return;
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }
    } else {
      if (!formData.email) {
        toast.error("Please enter your email");
        return;
      }
    }

    if (activeTab !== "Dr" && !formData.referralCode) {
      toast.error("Please enter a referral code");
      return;
    }

    // If registering with email, show the password modal first (DO NOT REGISTER YET)
    if (!registerWithPhone) {
      setShowPasswordModal(true);
      return;
    }

    // If registering with phone, proceed with registration
    try {
      const response = await api.post("/auth/user/register", {
        name: formData.name,
        phone: formData.phone,
        email: null,
        code: activeTab !== "Dr" ? formData.referralCode : null,
        gender: formData.gender,
        userType: activeTab === "Dr" ? "Doctor" : "OtherUser",
      });

      console.log("User data", response.data);

      if (response.status === 200 || response.status === 201) {
        setShowOtpModal(true);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration.");
    }
  };




  const handleOtpVerify = async () => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      const response = await api.post("/auth/user/register", {
        name: formData.name,
        gender: formData.gender,
        phone: formData.phone,
        otp: formData.otp,
        userType: activeTab === "Dr" ? "Doctor" : "OtherUser",
        code: activeTab !== "Dr" ? formData.referralCode : null,
        email: !registerWithPhone ? formData.email : null,
      });

      console.log("phone and otp", formData.phone, formData.otp);
      console.log("verify response", response.data);

      if (response.data.status === "success") {
        toast.success("OTP verified successfully!");
        setShowOtpModal(false);
        localStorage.setItem("authToken", response.data.token)
        const route = activeTab === "Dr" ? "/firstlogin" : "/welcome";
        navigate(route);
      } else {
        toast.error(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("An error occurred while verifying OTP.");
    }
  };


  const handlePasswordSubmit = async () => {
    if (!formData.password) {
      toast.error("Please enter a password");
      return;
    }

    try {
      // Register the user after they enter the password
      const response = await api.post("/auth/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        userType: activeTab === "Dr" ? "Doctor" : "OtherUser",
        code: activeTab !== "Dr" ? formData.referralCode.toUpperCase() : null,
      });

      console.log("Password submission response", response.data);

      if (response.status === 201) {
        toast.success("Registration successful!");
        localStorage.setItem("authToken", response.data.token);
        const route = activeTab === "Dr" ? "/firstlogin" : "/welcome";
        navigate(route);
      } else {
        toast.error(response.data.message || "Password submission failed");
      }
    } catch (error) {
      console.error("Password submission error:", error);
      toast.error("An error occurred while setting the password.");
    }

    setShowPasswordModal(false);
  };

  const toggleRegisterMethod = () => {
    setRegisterWithPhone(!registerWithPhone);
    setFormData(prevData => ({
      ...prevData,
      phone: "",
      email: "",
      otp: "",
      password: ""
    }));
  };

  return (
    <>
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <div className="min-h-[100dvh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="w-full bg-[#F7941C] text-white flex items-center justify-between py-4 text-sm px-4 z-50 mb-5"></div>

          {/* Main Content Wrapper */}
          <div className="flex-1 overflow-hidden flex flex-col items-center justify-center px-10">
            {/* Content */}
            <div className="w-full flex flex-col">
              {/* Logo and Title */}
              <div className="flex flex-col items-center mb-4">
                <img src={brebootSvg} alt="logo" className="w-auto h-26 mb-3" />
                <h2 className="text-xl font-bold text-gray-800">
                  Let's create your account
                </h2>
              </div>

              {/* Dock */}
              <div className="flex justify-center pb-5">
                <div className="bg-white shadow-xs border border-gray-200 rounded-xl py-1 px-1 inline-flex gap-1">
                  <button
                    className={`relative px-6 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === "Dr"
                      ? "bg-[#F7941C] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={() => setActiveTab("Dr")}
                  >
                    Doctor
                  </button>
                  <button
                    className={`relative px-6 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === "Patient"
                      ? "bg-[#F7941C] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={() => setActiveTab("Patient")}
                  >
                    Others
                  </button>
                </div>
              </div>

              {/* Scrollable Form Section */}
              <div className="max-h-[100dvh]">
                <div className="space-y-6 mb-4 text-sm flex flex-col items-center">
                  <div className="flex items-center max-w-80 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                      <span className="text-gray-700 font-semibold">
                        {activeTab === "Dr" ? activeTab : "Others"}
                      </span>
                    </div>
                    <input
                      className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="flex items-center max-w-80 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                    {registerWithPhone ? (
                      <>
                        <div className="flex items-center justify-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                          <span className="text-gray-700 font-semibold">
                            +91
                          </span>
                        </div>
                        <input
                          className="flex-1 bg-transparent px-4 py-3 focus:outline-none no-spinner"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          name="phone"
                          onChange={handleFormChange}
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                          <span className="text-gray-700 font-semibold">
                            Email
                          </span>
                        </div>
                        <input
                          className="w-full bg-transparent px-4 py-3 focus:outline-none"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          name="email"
                          onChange={handleFormChange}
                        />
                      </>
                    )}
                  </div>

                  {/* Referral Code for Patients */}
                  {activeTab === "Patient" && (
                    <div className="flex items-center max-w-80 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                        <span className="text-gray-700 font-semibold">
                          Code
                        </span>
                      </div>
                      <input
                        className="flex-1 bg-transparent px-4 py-3 focus:outline-none uppercase"
                        type="text"
                        placeholder="Enter referral Code"
                        value={formData.referralCode}
                        name="referralCode"
                        onChange={handleFormChange}
                      />
                    </div>
                  )}
                  {/* Gender selection */}

                  <div className="flex flex-col items-center w-full">
                    {/* <span className="text-gray-700 font-semibold mb-2">Select Gender</span> */}
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onChange={() => handleGenderChange("male")}
                          className="hidden"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border border-[#F7941C] flex items-center justify-center transition-all ${gender === "male" ? "bg-[#F7941C]" : "bg-white"
                            }`}
                        ></div>
                        <span className="text-gray-600">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={gender === "female"}
                          onChange={() => handleGenderChange("female")}
                          className="hidden"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border border-[#F7941C] flex items-center justify-center transition-all ${gender === "female" ? "bg-[#F7941C]" : "bg-white"
                            }`}
                        ></div>
                        <span className="text-gray-600">Female</span>
                      </label>
                    </div>
                  </div>

                  {/* WhatsApp Checkbox */}
                  <label className="flex items-center gap-3 mb-8 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      className="hidden"
                    />
                    <div className="w-3 h-3 rounded-full border border-[#F7941C] flex items-center justify-center transition-all">
                      {checked && (
                        <div className="w-1 h-1 rounded-full bg-[#F7941C]"></div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">
                      Receive updates and reminders on WhatsApp
                    </span>
                  </label>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleRegister}
                  className="w-full bg-black text-white py-3 rounded-xl mb-4 active:bg-gray-900 transition-opacity"
                >
                  Continue
                </button>

                {showOtpModal && (
                  <FormModal title="Enter OTP" onClose={() => setShowOtpModal(false)}>
                    <input
                      className="w-full px-4 py-3 border rounded mb-2"
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleFormChange}
                    />
                    <button
                      onClick={handleOtpVerify}
                      className="w-full bg-orange-500 text-white py-3 rounded-xl"
                    >
                      Verify OTP
                    </button>
                  </FormModal>
                )}

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-gray-500 font-medium text-xs">
                    or continue with
                  </span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Email Button */}
                <button
                  onClick={toggleRegisterMethod}
                  className="w-full text-gray-700 border border-gray-400 py-3 rounded-xl mb-8 active:bg-gray-200 transition-opacity"
                >
                  {registerWithPhone
                    ? "Email Address"
                    : "Phone Number"}
                </button>

                {showPasswordModal && (
                  <FormModal title="Set Your Password" onClose={() => setShowPasswordModal(false)}>
                    <input
                      className="w-full px-4 py-3 border rounded mb-2"
                      type="password"
                      name="password"  // Add name attribute
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleFormChange}
                    />
                    <button
                      onClick={handlePasswordSubmit}
                      className="w-full bg-orange-500 text-white py-3 rounded-xl"
                    >
                      Submit
                    </button>
                  </FormModal>
                )}

                {/* Social Login */}
                {/* <Link to={"/firstlogin"}>
                  <div className="flex justify-center gap-8 mb-8">
                    <button >
                      <img className="w-6 h-6" src={google} alt="google-logo" />
                    </button>
                  </div>
                </Link> */}

                {/* Terms */}
                <p className="text-center text-xs text-gray-500 px-6 mb-5">
                  By signing up I agree to the Terms of Services and Privacy
                  Policy, including usage of cookies
                </p>
                <p
                   onClick={() => {
                    console.log("Navigation to login")
                    navigate("/login")
                   }}
                  className="text-center text-xs px-6 pb-10 text-[#F7941C] font-semibold tracking-wide cursor-pointer">
                  Already a user?
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
