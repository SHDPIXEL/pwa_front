import React from "react";

const ConsentModal = ({ onAction, title, subtitleOne, subtitleTwo, action}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mt-2">{subtitleOne}</p>
                <p className="text-sm text-gray-600 mt-2">{subtitleTwo}</p>


                {/* Buttons */}
                <div className="flex flex-col justify-between gap-4 mt-6">
                    <button 
                        className="px-4 py-2 bg-[#F7941C] text-white rounded-lg active:bg-[#F7941C]/70"
                        onClick={() => onAction(true)}
                    >
                        {action}
                    </button>
                    <button 
                        className="px-4 py-2 border border-gray-400 active:bg-gray-200 text-gray-500 rounded-lg"
                        onClick={() => onAction(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentModal;
