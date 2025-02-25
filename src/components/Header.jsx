import redeemSvg from "../assets/images/redeem-bg.png";
import { Link } from "react-router-dom";
import coin from "../assets/images/Coin.png";


const Header = ({ title, icon, onAction }) => {
    return <div className="bg-[#F7941C] text-white sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-wide">{title}</h1>
            <div className="flex items-center gap-2">
                <div
                className="text-sm"
                    onClick={onAction}
                >
                    {icon}
                </div>
                <Link to="/redeem">
                    <div>
                        <img src={coin} alt="redeem-icon" className="w-7 h-auto" />
                    </div>
                </Link>
            </div>
        </div>
    </div>
}
export default Header;