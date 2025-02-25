import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/Api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/user/getuserdetails");
      setUserData(response.data.user);
      console.log(response.data)
      localStorage.setItem("GenderType", response.data.user.gender);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUserData(null); // Clear userData on error (e.g., invalid token)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserDetails(token);
    } else {
      setUserData(null); // Clear userData if no token exists
      setLoading(false);
    }
  }, []); // Initial fetch on mount

  const logout = () => {
    setUserData(null); // Clear user data in context
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, logout, fetchUserDetails }}>
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