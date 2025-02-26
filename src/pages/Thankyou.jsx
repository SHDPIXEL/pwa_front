import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  const navigate = useNavigate();

  // Retrieve order details from localStorage
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {
    orderId: "Unknown",
    product: {
      name: "Unknown Product",
      quantity: 1,
      price: "₹0",
      image: "",
    },
  };

  // Clean up localStorage after displaying
  useEffect(() => {
    localStorage.removeItem("orderDetails");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-[#F7941C] to-amber-500 pt-12 pb-20 px-4">
        <div className="flex flex-col items-center text-white">
          <CheckCircle className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
          <p className="text-center opacity-90">
            Your order has been successfully placed
          </p>
        </div>
      </div>
      <div className="px-4 -mt-12">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="border-b border-gray-300 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Order ID</span>
              <span className="font-medium text-gray-600">{orderDetails.orderId}</span>
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={orderDetails.product.image}
                alt={orderDetails.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {orderDetails.product.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                Quantity: {orderDetails.product.quantity}
              </p>
              <p className="font-semibold text-[#F7941C]">
                {orderDetails.product.price}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/welcome")}
            className="w-full bg-white border border-[#F7941C] text-[#F7941C] py-3 rounded-xl flex items-center justify-center gap-2 font-medium active:bg-orange-50"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;