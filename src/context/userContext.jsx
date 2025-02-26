import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import api from "../utils/Api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/user/getuserdetails");
      setUserData(response.data.user);
      console.log(response.data);
      localStorage.setItem("GenderType", response.data.user.gender);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUserData(null); // Clear userData on error (e.g., invalid token)
      // Only redirect if not already on "/" or "/login"
      if (location.pathname !== "/" && location.pathname !== "/login") {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserDetails(); // Fetch user details if token exists
    } else {
      setUserData(null); // No token, clear userData
      setLoading(false);
      // Only redirect if not already on "/" or "/login"
      if (location.pathname !== "/" && location.pathname !== "/login") {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]); // Add location.pathname to dependency array

  const logout = () => {
    setUserData(null); // Clear user data in context
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setLoading(false);
    navigate("/"); // Redirect to "/" on logout
  };

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, logout, fetchUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};