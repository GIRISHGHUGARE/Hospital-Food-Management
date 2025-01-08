// src/app/home/page.tsx
"use client"; // Ensure that this component is marked as a client component

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser, selectLoading, selectError } from "../../lib/store/features/authSlice";
import { useRouter } from "next/navigation"; // Use Next.js router instead of react-router-dom
import { logout } from "../../lib/store/features/authSlice"; // Assuming logout action exists in your slice
import Background from '../../assets/background.webp';
import { toast } from "react-hot-toast";

const page: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter(); // Using Next.js router for navigation

    // Get user data from Redux store
    const user = useSelector(selectUser); // Assuming selectUser gives the full user object
    const token = useSelector(selectToken); // Assuming selectToken gives the token

    // Access email from the user object
    const email = user?.email;

    useEffect(() => {
        if (!token) {
            router.push("/login");  // If no token, redirect to login page
        }
    }, [token, router]);

    const handleLogout = () => {
        // Clear the localStorage and dispatch the logout action
        localStorage.removeItem("authToken");
        dispatch(logout()); // Dispatch logout action to clear the user state
        toast.success("Logout Successful");
        router.push("/login"); // Redirect to login page after logout
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${Background.src})` }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {email || "User"}!</h1>

                    {/* User Details */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <strong className="text-gray-700">Email:</strong>
                            <span>{email}</span>
                        </div>
                        <div className="flex justify-between">
                            <strong className="text-gray-700">Role:</strong>
                            <span>{user?.role}</span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
