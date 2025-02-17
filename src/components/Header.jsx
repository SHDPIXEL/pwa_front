import redeemSvg from "../assets/images/redeem-bg.png";
import { Link } from "react-router-dom";

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
                        <img src={redeemSvg} alt="redeem-icon" className="w-10 h-10" />
                    </div>
                </Link>
            </div>
        </div>
    </div>
}
export default Header;