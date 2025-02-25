import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
// import dumy_1 from "../assets/images/dumy_1.jpg";
import dumy_1 from "../assets/svg/Byzepta_Logo.svg"
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import AffordabilityWidget from "./AffordabilityWidget";


const ProductPage = () => {

    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [copied, setCopied] = useState(false);
    const userType = localStorage.getItem('userType') || 'Patient';
    const [doctorCode, setDoctorCode] = useState("")

    const { userData, fetchUserDetails } = useUser(); // Assuming fetchUserDetails exists

    const navigate = useNavigate();

    const location = useLocation();
    const product = location.state || null;

    // const product = products.find((p) => p.id === parseInt(id));
    useEffect(() => {
        const initializeUserData = async () => {
            try {
                if (!userData) {
                    await fetchUserDetails();  // Fetch user data
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.error("Failed to load user data.");
            }
        };

        initializeUserData();
    }, [fetchUserDetails]);  // Removed userData dependency to prevent unnecessary re-renders

    // Set doctorCode when userData updates
    useEffect(() => {
        if (userData?.code) {
            setDoctorCode(userData.code);
        }
    }, [userData]);  // Runs only when userData changes




    if (!product) {
        return <div className="text-center text-red-500 font-medium">Product not found!</div>;
    }

    const handlePruchase = () => {
        return <AffordabilityWidget key={"A04Ozq"} />
        navigate("/thankyou")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Product Image */}
            <div className="relative w-full h-96">
                <img
                    src={dumy_1}
                    alt={product.name}
                    className="w-full h-full object-contain"
                />
                {product.discountPercentage > 0 ? (
                    <div className="absolute top-4 left-4 bg-[#F7941C] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.discountPercentage}% OFF
                    </div>
                ) : ("")}
            </div>

            {/* Product Details */}
            <div className="px-4 py-6 flex-1 flex flex-col justify-between border-t border-gray-100">
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

                    <p className="text-gray-600 text-sm">
                        {product.description}
                    </p>


                    {/* Doctor Referral Code for Patients */}
                    {userType === 'Patient' && (
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
                            >
                                -
                            </button>
                            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                            <button
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg active:bg-gray-100"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <button
                        onClick={handlePruchase}
                        className="w-full bg-[#F7941C] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium active:bg-amber-600">
                        <CreditCard className="w-5 h-5" />
                        Buy Now • ₹{(product.price * quantity).toLocaleString()}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProductPage;