// components/PaymentResponsePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/Api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const PaymentResponsePage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // PayU posts the response directly to this endpoint, so we rely on backend verification
        const response = await api.get("/auth/user/verify-status"); // Optional: Check status if needed
        const { status, message, transaction_id } = response.data;

        if (status === "success") {
          toast.success(`${message} Transaction ID: ${transaction_id}`);
          navigate("/thankyou"); // Redirect to a success page
        } else {
          toast.error(message);
          navigate("/"); // Redirect to home on failure
        }
      } catch (error) {
        console.error("Verification Error:", error);
        toast.error("Payment verification failed. Please contact support.");
        navigate("/");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {isVerifying ? (
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-700">Verifying your payment, please wait...</p>
        </div>
      ) : (
        <p className="text-gray-700">Redirecting...</p>
      )}
    </div>
  );
};

export default PaymentResponsePage;