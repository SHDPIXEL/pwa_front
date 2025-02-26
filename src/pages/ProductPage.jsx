import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import dumy_1 from "../assets/svg/Byzepta_Logo.svg";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import api from "../utils/Api";
import Loader from "../components/Loader";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const userType = localStorage.getItem("userType") || "Patient";
  const [doctorCode, setDoctorCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { userData, fetchUserDetails } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state || null;

//   const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        if (!userData) {
          await fetchUserDetails();
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user data.");
      }
    };
    initializeUserData();
  }, [fetchUserDetails]);

  useEffect(() => {
    if (userData?.code) {
      setDoctorCode(userData.code);
    }
  }, [userData]);

  if (!product) {
    return (
      <div className="text-center text-red-500 font-medium">
        {isLoading ? <Loader /> : "Product not found!"}
      </div>
    );
  }

  const handlePurchase = async () => {
    const data = {
      txnid: `TXN_${id}_${Date.now()}`,
      amount: (product.price * quantity).toFixed(2),
      productinfo: product.name,
      firstname: userData?.firstname || "Guest",
      email: userData?.email || "guest@example.com",
    };

    try {
      setIsLoading(true);

      // Step 1: Generate hash
      const hashResponse = await api.post("/api/payment", data);
      const hash = hashResponse.data.hash;

      if (!hash) {
        throw new Error("Hash generation failed");
      }

      // Step 2: Prepare payment data
      const paymentData = {
        key: "A00Ozq", 
        txnid: data.txnid,
        amount: data.amount,
        firstname: data.firstname,
        email: data.email,
        phone: userData?.phone || "1234567890",
        productinfo: data.productinfo,
        surl: `/thankyou`, 
        furl: `/`, 
        hash: hash,
        service_provider: "payu_paisa",
      };

      // Step 3: Initiate payment
      const paymentResponse = await api.post("/api/response", paymentData, {
        responseType: "text", // Expect text (URL or HTML form)
      });

      if (paymentResponse.data) {
        // Handle redirect based on response type
        if (typeof paymentResponse.data === "string" && paymentResponse.data.startsWith("http")) {
          window.location.href = paymentResponse.data; // Redirect if URL
        } else {
          // If HTML form is returned, inject it into the DOM
          const paymentForm = document.createElement("div");
          paymentForm.innerHTML = paymentResponse.data;
          document.body.appendChild(paymentForm);
          paymentForm.querySelector("form").submit(); // Auto-submit PayU form
        }
      } else {
        toast.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-96">
        {isLoading ? (
          <Loader />
        ) : (
          <img src={dumy_1} alt={product.name} className="w-full h-full object-contain" />
        )}
        {product.discountPercentage > 0 && !isLoading ? (
          <div className="absolute top-4 left-4 bg-[#F7941C] text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.discountPercentage}% OFF
          </div>
        ) : null}
      </div>

      {/* Product Details */}
      <div className="px-4 py-6 flex-1 flex flex-col justify-between border-t border-gray-100">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#F7941C]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm">{product.description}</p>

            {/* Doctor Referral Code for Patients */}
            {userType === "Patient" && (
              <div className="bg-orange-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Doctor's Referral Code</h3>
                <input
                  type="text"
                  value={doctorCode}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white rounded-lg border border-blue-200 text-gray-700"
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-medium text-gray-700">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg active:bg-gray-100"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  disabled={isLoading}
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg active:bg-gray-100"
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={isLoading}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="p-4">
          <button
            onClick={handlePurchase}
            className="w-full bg-[#F7941C] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium active:bg-amber-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader isCenter={false} BorderColor="border-white" />
                Proceeding Payment...
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Buy Now • ₹{(product.price * quantity).toLocaleString()}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;