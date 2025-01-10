"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { FaUser, FaClipboardList, FaBox, FaTruck, FaBars } from 'react-icons/fa';
import PatientList from '../../components/PatientList';
import FoodChartList from '../../components/FoodChartList';
import PantryStaffList from '../../components/PantryChartList';
import MealDeliveryList from '../../components/MealDeliveryList';
import { logout } from "../../lib/store/features/authSlice";
import axios from 'axios';
import { toast } from "react-hot-toast";


const DashboardPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('patients');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Handle tab changes
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setIsSidebarOpen(false); // Close sidebar after a tab is selected
    };

    // Toggle sidebar visibility on small screens
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
                className={`w-64 bg-blue-600 text-white p-4 fixed left-0 top-0 h-screen z-10 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <h1 className="text-xl font-bold mb-6">Dashboard</h1>
                <ul className="space-y-4">
                    <li
                        onClick={() => handleTabChange('patients')}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-blue-700 ${activeTab === 'patients' ? 'bg-blue-700' : ''}`}
                    >
                        <FaUser /> <span>Manage Patients</span>
                    </li>
                    <li
                        onClick={() => handleTabChange('food-charts')}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-blue-700 ${activeTab === 'food-charts' ? 'bg-blue-700' : ''}`}
                    >
                        <FaClipboardList /> <span>Manage Food Charts</span>
                    </li>
                    <li
                        onClick={() => handleTabChange('pantry-staff')}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-blue-700 ${activeTab === 'pantry-staff' ? 'bg-blue-700' : ''}`}
                    >
                        <FaBox /> <span>Manage Pantry Staff</span>
                    </li>
                    <li
                        onClick={() => handleTabChange('meal-delivery')}
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-blue-700 ${activeTab === 'meal-delivery' ? 'bg-blue-700' : ''}`}
                    >
                        <FaTruck /> <span>Meal Delivery Tracking</span>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 py-2 px-4 rounded-lg w-full"
                >
                    Logout
                </button>
            </div>

            {/* Hamburger Menu Button for Mobile */}
            <button
                className="md:hidden absolute top-4 left-4 text-blue-400 z-20"
                onClick={toggleSidebar}
            >
                <FaBars size={24} />
            </button>

            {/* Main Content */}
            <div
                className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'
                    }`}
            >
                <div className="flex justify-between items-center mt-10 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {activeTab === 'patients' && 'Manage Patients'}
                        {activeTab === 'food-charts' && 'Manage Food Charts'}
                        {activeTab === 'pantry-staff' && 'Manage Pantry Staff'}
                        {activeTab === 'meal-delivery' && 'Meal Delivery Tracking'}
                    </h2>
                </div>

                {/* Dynamic Content Display */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {activeTab === 'patients' && <PatientList />}
                    {activeTab === 'food-charts' && <FoodChartList />}
                    {activeTab === 'pantry-staff' && <PantryStaffList />}
                    {activeTab === 'meal-delivery' && <MealDeliveryList />}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
