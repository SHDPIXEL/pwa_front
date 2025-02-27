import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/Api";

const useAuth = (fetchUserDetails, navigate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false); // For registration
  const [showPasswordModal, setShowPasswordModal] = useState(false); // For registration

  // Registration Functions (unchanged from previous)
  const handleRegister = async (formData, activeTab, registerWithPhone, selectedState) => {
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }
    if (activeTab !== "Dr" && !formData.referralCode) {
      toast.error("Please enter a referral code");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        name: formData.name,
        phone: registerWithPhone ? formData.phone : null,
        email: !registerWithPhone ? formData.email : null,
        code: activeTab !== "Dr" ? formData.referralCode.toUpperCase() : null,
        gender: formData.gender,
        userType: activeTab === "Dr" ? "Doctor" : "OtherUser",
        state: activeTab === "Dr" ? selectedState : null,
      };

      const response = await api.post("/auth/user/register", payload);

      if (response.status === 200 || response.status === 201) {
        if (registerWithPhone) {
          setShowOtpModal(true);
        } else {
          setShowPasswordModal(true);
        }
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (formData, activeTab, selectedState) => {
    if (!formData.password) {
      toast.error("Please enter a password");
      return;
    }
    try {
      setIsVerifyLoading(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        userType: activeTab === "Dr" ? "Doctor" : "OtherUser",
        code: activeTab !== "Dr" ? formData.referralCode.toUpperCase() : null,
        state: activeTab === "Dr" ? selectedState : null,
      };

      const response = await api.post("/auth/user/register", payload);

      if (response.status === 200 || response.status === 201) {
        setShowPasswordModal(false);
        setShowOtpModal(true);
      } else {
        toast.error(response.data.message || "Password submission failed");
      }
    } catch (error) {
      console.error("Password submission error:", error);
      toast.error(error.response?.data?.message || "An error occurred while setting the password.");
    } finally {
      setIsVerifyLoading(false);
    }
  };

  const handleOtpVerify = async (formData, activeTab, registerWithPhone, selectedState) => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setIsVerifyLoading(true);
      const payload = {
        name: formData.name,
        gender: formData.gender,
        phone: registerWithPhone ? formData.phone : null,
        email: !registerWithPhone ? formData.email : null,
        otp: formData.otp,
        password: !registerWithPhone ? formData.password : null,
        userType: activeTab === "Dr" ? "Doctor" : "OtherUser",
        code: activeTab !== "Dr" ? formData.referralCode : null,
        state: activeTab === "Dr" ? selectedState : null,
      };

      const response = await api.post("/auth/user/register", payload);

      if (response.data.status === "success" || response.status === 200) {
        toast.success("OTP verified successfully!");
        setShowOtpModal(false);
        localStorage.setItem("authToken", response.data.token);
        await fetchUserDetails();
        const route = activeTab === "Dr" ? "/firstlogin" : "/welcome";
        navigate(route);
      } else {
        toast.error(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("An error occurred while verifying OTP.");
    } finally {
      setIsVerifyLoading(false);
    }
  };

  // Login Functions
  const handleLogin = async (formData, loginWithPhone, setShowOtpInput) => {
    if (loginWithPhone) {
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
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (!formData.password) {
        toast.error("Please enter your password");
        return;
      }
    }

    try {
      setIsLoading(true);
      const payload = loginWithPhone
        ? {
          phone: formData.phone,
          email: null,
          otp: null,
          password: null,
        }
        : {
          phone: null,
          email: formData.email,
          otp: null,
          password: formData.password,
        };

      const response = await api.post("/auth/user/login", payload);

      if (response.status === 200) {
        if (loginWithPhone) {
          toast.success("OTP sent successfully!");
          setShowOtpInput(true); // Show OTP input for phone login
        } else {
          localStorage.setItem("authToken", response.data.token);
          await fetchUserDetails();
          toast.success("Login successful!");
          const userType = response.data.userType === "Doctor" ? "Dr" : response.data.userType;
          localStorage.setItem("userType", userType);
          navigate("/welcome");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginOtpVerify = async (formData) => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        phone: formData.phone,
        email: null,
        otp: formData.otp,
        password: null,
      };

      const response = await api.post("/auth/user/login", payload);

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        await fetchUserDetails();
        toast.success("Login successful!");
        const userType = response.data.userType === "Doctor" ? "Dr" : response.data.userType;
        localStorage.setItem("userType", userType);
        navigate("/welcome");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const resendLoginOtp = async (formData) => {
    try {
      setIsLoading(true);
      const payload = {
        phone: formData.phone,
        email: null,
        otp: null,
        password: null,
      };

      const response = await api.post("/auth/user/login", payload);

      if (response.status === 200) {
        toast.success("New OTP sent successfully!");
        return true;
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
        return false;
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isVerifyLoading,
    showOtpModal,
    setShowOtpModal,
    showPasswordModal,
    setShowPasswordModal,
    handleRegister,
    handlePasswordSubmit,
    handleOtpVerify,
    handleLogin,           // New: For login
    handleLoginOtpVerify,  // New: For login OTP verification
    resendLoginOtp,        // New: For resending login OTP
  };
};

export default useAuth;