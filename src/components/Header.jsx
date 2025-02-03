const Header = ({ title, icon }) => {
    return <div className="bg-[#F7941C] text-white shadow-xs sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">{title}</h1>
            <div>
                {icon}
            </div>
        </div>
    </div>
}
export default Header;