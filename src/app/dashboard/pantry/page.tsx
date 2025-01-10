"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTasks, FaUsers, FaTruck, FaBars } from "react-icons/fa";
import TaskList from "../../../components/TaskList";
import DeliveryPersonnelList from "../../../components/DeliveryPersonnelList";
import MealDeliveryList from "../../../components/MealDeliveryList";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/store/features/authSlice";

const Page: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("tasks");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = async () => {
        // Clear the localStorage and dispatch the logout action
        try {
            await axios.get("/api/auth/logout");
            localStorage.removeItem("authToken");
            dispatch(logout()); // Dispatch logout action to clear the user state
            toast.success("Logout Successful");
            router.push("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error during token verification:", error);
        }

    };
    return (
        <div className="min-h-screen flex relative">
            {/* Sidebar */}
            <div
                className={`w-64 bg-green-600 text-white p-4 fixed left-0 top-0 h-screen z-10 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <h1 className="text-xl font-bold mb-6">Pantry Dashboard</h1>
                <ul className="space-y-4">
                    <li
                        onClick={() => handleTabChange("tasks")}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-green-700 ${activeTab === "tasks" ? "bg-green-700" : ""
                            }`}
                    >
                        <FaTasks /> <span>View Assigned Tasks</span>
                    </li>
                    <li
                        onClick={() => handleTabChange("personnel")}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-green-700 ${activeTab === "personnel" ? "bg-green-700" : ""
                            }`}
                    >
                        <FaUsers /> <span>Manage Delivery Personnel</span>
                    </li>
                    <li
                        onClick={() => handleTabChange("delivery")}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-green-700 ${activeTab === "delivery" ? "bg-green-700" : ""
                            }`}
                    >
                        <FaTruck /> <span>Track Deliveries</span>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 py-2 px-4 rounded-lg w-full"
                >
                    Logout
                </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
                className="md:hidden absolute top-4 left-4 text-green-400 z-20"
                onClick={toggleSidebar}
            >
                <FaBars size={24} />
            </button>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {activeTab === "tasks" && "Assigned Tasks"}
                    {activeTab === "personnel" && "Delivery Personnel"}
                    {activeTab === "delivery" && "Track Meal Deliveries"}
                </h2>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    {activeTab === "tasks" && <TaskList />}
                    {activeTab === "personnel" && <DeliveryPersonnelList />}
                    {activeTab === "delivery" && <MealDeliveryList />}
                </div>
            </div>
        </div>
    );
};

export default Page;
