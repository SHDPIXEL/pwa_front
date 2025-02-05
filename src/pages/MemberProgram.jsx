import React from 'react';
import { CategoryCard, ProductCard, BrandCard } from '../components/cards';
import { BottomNavBarMemberProgram } from '../components/BottomNavBar';
import dumy_1 from "../assets/images/dumy_1.jpg";
import Header from '../components/Header';
import { useState, useEffect } from 'react';


const MemberProgramPage = () => {

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("userType");
        setUserType(user);
    }, []);


    const products = [
        {
            id: 1,
            name: 'Byzepta Pack',
            price: userType === "Dr" ? 839.3 : 959.2, 
            originalPrice: "1199",
            image: dumy_1
        },
    ];



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
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </div>
            </div>

            <BottomNavBarMemberProgram />
        </div>
    );
};

export default MemberProgramPage;
