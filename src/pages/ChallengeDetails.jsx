import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileImage, FileVideo, User, Phone, Upload, X, Check } from "lucide-react";
import challenge1 from "../assets/images/challenge1.png"
import challenge2 from "../assets/images/challenge2.png"
import challenge3 from "../assets/images/challenge3.png"
import steps from "../assets/images/steps-rb.png"
import { useUser } from "../context/userContext";

const ChallengeDetails = () => {
    // const { id } = useParams();
    const [activeTab, setActiveTab] = useState("details");
    const [messaeg, setMessage] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
        files: [],
        previews: [],
    });

    const navigate = useNavigate();
    const { userData } = useUser();

    const challenge = {
        title: "10,000 Steps Daily",
        category: "Fitness & Nutrition",
        description: "Walk 10,000 steps every day for a month.",
        details: [
            {
                imagePlaceholder: challenge1,
                text: "Challenge your self to complete 10000 steps daily. This helps to upregulate your UCP1 and improve your cardiovascular health and maintain an active lifestyle.",
                side: "left"
            },
            {
                imagePlaceholder: steps,
                text: "Track your progress using any fitness app of your choice. Make sure to capture daily screenshots of your achievement.",
                side: "right"
            },
            {
                imagePlaceholder: challenge2,
                text: "Record a short video summary of your journey at the end of each week to inspire others.",
                side: "left"
            }
        ],
        participation: [
            "Register for the challenge through the form",
            "Share your progress through images/videos",
            "Complete this challenge to earn reward"
        ]
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Check if any file is a video
        if (selectedFiles.some(file => file.type.startsWith("video/"))) {
            if (selectedFiles.length > 1) {
                alert("Please select only one video file");
                return;
            }
            setFormData({
                ...formData,
                files: selectedFiles, // Replace existing files with only the video
                previews: [URL.createObjectURL(selectedFiles[0])], // Single preview
            });
            return;
        }

        // Ensure all files are images
        if (selectedFiles.some(file => !file.type.startsWith("image/"))) {
            alert("Please select only image files");
            return;
        }

        // Enforce max limit of 5 images
        if (formData.files.length + selectedFiles.length > 5) {
            alert("You can select a maximum of 5 images");
            return;
        }

        // Append new images to existing ones
        setFormData({
            ...formData,
            files: [...formData.files, ...selectedFiles],
            previews: [...formData.previews, ...selectedFiles.map(file => URL.createObjectURL(file))],
        });
    };

    const handleSubmit = () => {
        setMessage(true)
        setTimeout(() => {
            navigate("/challenges")
        }, 3000);
    }


    const removeFile = (index) => {
        const newFiles = [...formData.files];
        const newPreviews = [...formData.previews];

        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(newPreviews[index]);

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setFormData({
            ...formData,
            files: newFiles,
            previews: newPreviews
        });
    };



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dock-style navigation */}
            <div className="sticky top-4 z-20">
                <div className="flex justify-center">
                    <div className="bg-white shadow-lg rounded-xl py-2 px-2 inline-flex gap-2">
                        <button
                            className={`relative px-8 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === "details"
                                ? "bg-[#F7941C] text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("details")}
                        >
                            Details
                        </button>
                        <button
                            className={`relative px-8 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === "submit"
                                ? "bg-[#F7941C] text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("submit")}
                        >
                            Submit Challenge
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-10 px-4 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{challenge.title}</h2>
                    <p className="text-sm text-gray-500">{challenge.category}</p>
                </div>

                {activeTab === "details" && (
                    <div className="space-y-12 pb-10">
                        {/* Challenge Details Section */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 mb-8">Challenge Details</h3>
                            <div className="space-y-12">
                                {challenge.details.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-8 ${item.side === "right" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-amber-400/10 rounded-full">
                                            <img
                                                src={item.imagePlaceholder}
                                                alt="Challenge illustration"
                                                className="w-20 h-20"
                                            />
                                        </div>
                                        <p className="flex-1 text-sm text-gray-600 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Rest of the component remains the same */}
                        <section className="bg-orange-100 rounded-3xl p-8 text-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">How to Participate</h3>
                            <ul className="space-y-4">
                                {challenge.participation.map((point, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7941C] text-white text-sm">
                                            {index + 1}
                                        </span>
                                        <p className="flex-1 text-gray-600">{point}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                )}

                {/* Submit section remains the same */}
                {activeTab === "submit" && (
                    <div className="space-y-6">
                        <div className="p-6">
                            {/* Name Input */}
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                                <User className="w-5 h-5 text-gray-500" />
                                <input
                                    className="ml-2 flex-1 bg-transparent text-gray-400 focus:outline-none text-sm"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={userData.name}
                                    disabled
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Phone Number Input */}
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <input
                                    className="ml-2 flex-1 bg-transparent focus:outline-none text-sm text-gray-400"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={userData.phone}
                                    disabled
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            {/* Message Input */}
                            <textarea
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-4"
                                rows="3"
                                placeholder="How was your experience? Let us Know!"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>

                            {/* File Upload Section */}
                            <div>
                                <label className="flex items-center gap-3 justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl py-4 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <Upload className="w-4 h-4 text-[#F7941C]" />
                                    <div className="text-sm text-gray-600">
                                        {formData.files.length === 0 ?
                                            "Upload Images (max 5) or 1 Video" :
                                            formData.files[0]?.type.startsWith('video/') ?
                                                "1 Video selected" :
                                                `${formData.files.length}/5 Images selected`
                                        }
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        multiple={!formData.files.some(file => file.type.startsWith('video/'))}
                                    />
                                </label>

                                {formData.previews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {formData.previews.map((preview, index) => (
                                            <div key={index} className="relative">
                                                {formData.files[index]?.type.startsWith('image/') ? (
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <video
                                                        src={preview}
                                                        className="w-full h-24 object-cover rounded-lg"
                                                        controls
                                                    />
                                                )}
                                                <button
                                                    onClick={() => removeFile(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#F7941C] text-white py-3 rounded-xl mt-6 hover:opacity-90 transition-opacity">
                                Submit Challenge
                            </button>
                            {messaeg &&
                                <div className="border border-green-500 mt-4 py-3 rounded-md">
                                    <p className="capitalize text-center text-sm text-green-600">
                                        <div className="flex items-center justify-center gap-1">
                                            <Check className="h-3.5 w-3.5" />
                                            <div>Challenge Completed Successfully</div>
                                        </div>
                                        {/* <div>redirecting to challenges...</div> */}
                                    </p>
                                </div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeDetails;