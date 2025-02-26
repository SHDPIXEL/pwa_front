import React from 'react';
import { CategoryCard, ProductCard, BrandCard } from '../components/cards';
import { BottomNavBarMemberProgram } from '../components/BottomNavBar';
// import dumy_1 from "../assets/images/dumy_1.jpg";
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import api from '../utils/Api';
import dumy_1 from "../assets/svg/Byzepta_Logo.svg";
import Loader from '../components/Loader';

const MemberProgramPage = () => {

    const [userType, setUserType] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("userType");
        setUserType(user);
    }, []);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("user/products");
                setProductDetails(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false)
            }
        };
        fetchProduct();
    }, []);


    return (
        <div className="min-h-screen text-gray-900 font-poppins">

            <div>
                <Header title={"Member Program"} icon={userType === "Dr" ? "Doctor" : userType} />
            </div>

            <div className="px-4 py-4 pb-24">
                {/* Products */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Exclusive Member Offers</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar pb-2">
                        {
                            isLoading ? (
                                <Loader />
                            ) : (
                                <div>
                                    {productDetails.map((product) => {
                                        const discountPercentage = product.oldPrice
                                            ? ((1 - product.newPrice / product.oldPrice) * 100).toFixed(2)
                                            : 0;

                                        return (
                                            <ProductCard
                                                key={product.id}
                                                id={product.id}
                                                name={product.name}
                                                price={userType === "Dr" ? product.newPrice * 0.9 : product.newPrice}
                                                originalPrice={product.oldPrice}
                                                image={dumy_1}
                                                discount={discountPercentage + "% OFF"}
                                                description={product.description}
                                            />
                                        );
                                    })}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <BottomNavBarMemberProgram />
        </div>
    );
};

export default MemberProgramPage;
