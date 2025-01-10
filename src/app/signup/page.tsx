"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, setError } from '../../lib/store/features/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Using next/navigation instead of 'react-router-dom'
import { toast } from "react-hot-toast";
import Background from '../../assets/background.webp';
import { RootState } from '../../lib/store/store'; // Adjust this import based on your store setup
import Header from '@/components/Header';

// Assuming User type looks something like this
export interface User {
    _id: string | null;
    email: string | null;
    role: string | null;
}

// The type for the Login Response
export interface LoginResponseData {
    token: string; // The authentication token
    user: User;    // The user data
}

const Page: React.FC = () => {
    const router = useRouter(); // For navigation in Next.js
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");

    // Access loading and error states from Redux store with appropriate types
    const loading = useSelector((state: RootState) => state.auth.loading);

    // Handle login submission
    const handleSubmit = async (): Promise<void> => {
        dispatch(setLoading(true)); // Set loading state
        dispatch(setError(null)); // Clear previous errors

        try {
            if (!email || !password) {
                toast.error("Please fill in all fields.");
                return;
            }

            const response = await axios.post<LoginResponseData>("/api/auth/signup", { email: email, password: password, role: role });
            const data: LoginResponseData = response.data;
            dispatch(login({ token: data.token, user: data.user }));
            toast.success("SignUp successful!");

            // Navigate to the home screen after successful login
            router.push('/dashboard'); // Assuming 'home' is the route
        } catch {
            dispatch(setError("SignUp failed"));
            toast.error("SignUp failed! ");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${Background.src})` }}

        >
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                {/* Login Card */}
                <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                    {/* Logo Image */}
                    <div className="flex justify-center">
                        {/* <img src={LogoImage} alt="Logo" className="w-24 h-24" /> */}
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">Get Registered !!</h2>

                    {/* Form */}
                    <div className="mt-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-gray-700">Email</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Login Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleSubmit}
                                className={`w-full py-2 px-4 bg-blue-600 font-bold text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? "Signing up..." : "SignUp"}
                            </button>
                        </div>

                        {/* Register Link */}
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <span
                                    className="text-green-600 cursor-pointer font-bold"
                                    onClick={() => router.push('/login')}  // Navigate to the SignUp page
                                >
                                    Sign In
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
