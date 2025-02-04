const Header = ({ title, icon, onAction }) => {
    return <div className="bg-[#F7941C] text-white sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-wide">{title}</h1>
            <div
            onClick={onAction}
            >
                {icon}
            </div>
        </div>
    </div>
}
export default Header;