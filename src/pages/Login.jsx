import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import brebootSvg from "../assets/svg/BrebootLogo.svg";
import api from '../utils/Api';
import { useUser } from '../context/userContext';
import Loader from '../components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const [loginWithPhone, setLoginWithPhone] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchUserDetails } = useUser();

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    otp: '',
    password: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (loginWithPhone) {
      if (!formData.phone) {
        toast.error("Please enter your phone number");
        return;
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      try {
        setIsLoading(true)
        const response = await api.post("/auth/user/login", {
          phone: formData.phone,
          email: null,
          otp: null,
          password: null,
        });

        if (response.status === 200) {
          toast.success("OTP sent successfully!");
          setShowOtpInput(true);
        } else {
          toast.error(response.data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data?.message || "Failed to send OTP");
      }finally{setIsLoading(false)}
    } else {
      if (!formData.email) {
        toast.error("Please enter your email");
        return;
      }
      if (!formData.password) {
        toast.error("Please enter your password");
        return;
      }

      try {
        setIsLoading(true)
        const response = await api.post("/auth/user/login", {
          phone: null,
          email: formData.email,
          otp: null,
          password: formData.password,
        });

        console.log(response.data)
        console.log(response.data.userType);

        if (response.status === 200) {
          // Store auth token
          localStorage.setItem("authToken", response.data.token);
          await fetchUserDetails();
          toast.success("Login successful!");
          const userType = response.data.userType === "Doctor" ? "Dr" : response.data.userType
          localStorage.setItem("userType", userType)
          navigate('/welcome');
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data?.message || "Login failed");
      }finally{setIsLoading(false)}
    }
  };

  const handleOtpVerify = async () => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setIsLoading(true)
      const response = await api.post("/auth/user/login", {
        phone: formData.phone,
        email: null,
        otp: formData.otp,
        password: null,
      });

      console.log(response.data);
      console.log(response.data.userType);

      if (response.status === 200) {
        // Store auth token
        localStorage.setItem("authToken", response.data.token);
        await fetchUserDetails();
        toast.success("Login successful!");
        const userType = response.data.userType === "Doctor" ? "Dr" : response.data.userType
        localStorage.setItem("userType", userType)
        navigate('/welcome');
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    }finally{
      setIsLoading(false);
    }
  };


  const handleResendOtp = async () => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/user/login", {
        phone: formData.phone,
        email: null,
        otp: null,
        password: null,
      });

      if (response.status === 200) {
        toast.success("New OTP sent successfully!");
        setResendTimer(60);
        setIsLoading(false)
        setIsResendDisabled(true);
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    let interval;
    if (showOtpInput && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [showOtpInput, resendTimer]);


  const toggleLoginMethod = () => {
    setLoginWithPhone(!loginWithPhone);
    setShowOtpInput(false);
    setFormData({
      phone: '',
      email: '',
      otp: '',
      password: ''
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full bg-[#F7941C] text-white flex items-center justify-between py-4 text-sm px-4 z-50 mb-5"></div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center px-10">
        <div className="w-full flex flex-col">
          <div className='flex items-center justify-center'>
            <img src={brebootSvg} alt="" className='w-auto h-26 mb-3' />
          </div>

          {/* Title */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-sm text-gray-600 mt-2">Login to your account</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 mb-6">
            {loginWithPhone ? (
              <>
                <div className="flex items-center max-w-80 mx-auto bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                    <span className="text-gray-700 font-semibold">+91</span>
                  </div>
                  <input
                    className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    maxLength={10}
                    onChange={handleFormChange}
                  />
                </div>
                {showOtpInput && (
                  <div className="max-w-80 mx-auto flex flex-col items-center">
                    <input
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 focus:border-[#F7941C]"
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleFormChange}
                    />
                    <button
                      onClick={handleResendOtp}
                      disabled={isResendDisabled}
                      className={`text-[#F7941C] font-semibold text-xs mt-2 ${isResendDisabled ? "opacity-50" : ""}`}
                    >
                        {isResendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center max-w-80 mx-auto bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F7941C]/20 focus-within:border-[#F7941C]">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-r border-gray-200 w-20">
                    <span className="text-gray-700 font-semibold">Email</span>
                  </div>
                  <input
                    className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="max-w-80 mx-auto">
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F7941C]/20 focus:border-[#F7941C]"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
          </div>

          {/* Login Button */}
          <div className="max-w-80 mx-auto w-full">
            <button
              onClick={loginWithPhone ? (showOtpInput ? handleOtpVerify : handleLogin) : handleLogin}
              className={`w-full bg-black text-white py-3 rounded-xl mb-4 active:bg-gray-900 transition-opacity ${isLoading ? "bg-gray-700" : "bg-black"}`}
            >{
              isLoading ? (<Loader isCenter={false} />) : (
                loginWithPhone ? (showOtpInput ? "Verify OTP" : "Get OTP") : "Login"
              ) 
            }
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-gray-500 font-medium text-xs">
                or continue with
              </span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Toggle Method Button */}
            <button
              onClick={toggleLoginMethod}
              className="w-full text-gray-700 border border-gray-400 py-3 rounded-xl mb-8 active:bg-gray-200 transition-opacity"
            >
              {loginWithPhone ? "Email Address" : "Phone Number"}
            </button>

            {/* Sign Up Link */}
            <p
              onClick={() => navigate('/')}
              className="text-center text-xs px-6 pb-10 text-[#F7941C] font-semibold tracking-wide cursor-pointer"
            >
              Don't have an account?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;