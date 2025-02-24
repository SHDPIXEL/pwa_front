
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear stored data
    localStorage.removeItem("userType"); 
    localStorage.removeItem("authToken"); 
    localStorage.clear();
    navigate("/login");

    // Optional: Show a success message
    toast.success("Logout Successfull")
    console.log("Logged out successfully!");
  };
  return logout;
};

export default useLogout;
