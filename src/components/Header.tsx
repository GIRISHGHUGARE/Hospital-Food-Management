"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full h-[70px] px-6 flex items-center justify-between z-50 bg-white bg-opacity-5 backdrop-blur-lg shadow-lg border-b border-white/10">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-800">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Hospital Food Manager Logo"
                        className="h-[80px] w-[80px]"
                    />
                </Link>
            </div>

            {/* Navigation (Desktop) */}
            <nav className="hidden md:flex space-x-8 relative">
                <Link href="/" className="text-white font-semibold text-lg hover:text-green-500 transition">
                    Home
                </Link>
                <Link href="/about" className="text-white font-semibold text-lg hover:text-green-500 transition">
                    About
                </Link>
                <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                >
                    <span className="cursor-pointer text-white font-semibold text-lg hover:text-green-500 transition">
                        Services
                    </span>
                    {isServicesOpen && (
                        <div
                            className="absolute left-0 w-48 bg-white bg-opacity-50 shadow-lg rounded-lg flex flex-col"
                        >
                            <Link
                                href="/hospital-dashboard"
                                className="px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-gray-800 transition"
                            >
                                Hospital Dashboard
                            </Link>
                            <Link
                                href="/inner-pantry"
                                className="px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-gray-800 transition"
                            >
                                Inner Pantry
                            </Link>
                            <Link
                                href="/delivery-personnel"
                                className="px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-gray-800 transition"
                            >
                                Delivery Personnel
                            </Link>
                        </div>
                    )}
                </div>
                <Link href="/contact" className="text-white font-semibold text-lg hover:text-green-500 transition">
                    Contact
                </Link>
            </nav>

            {/* Buttons (Desktop) */}
            <div className="hidden md:flex space-x-4">
                <Link href="/login">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition">
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="px-4 py-2 text-sm font-medium text-white border border-gray-300 hover:bg-gray-500 rounded-lg transition">
                        Signup
                    </button>
                </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden relative">
                <button
                    className="text-xl text-gray-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-50 shadow-lg rounded-lg flex flex-col">
                        <Link href="/" className="px-4 py-2 text-white hover:bg-green-100 hover:text-gray-800 transition">
                            Home
                        </Link>
                        <Link href="/about" className="px-4 py-2 text-white hover:bg-green-100 hover:text-gray-800 transition">
                            About
                        </Link>
                        <Link
                            href="/hospital-dashboard"
                            className="px-4 py-2 text-white hover:bg-green-100 hover:text-gray-800 transition"
                        >
                            Hospital Dashboard
                        </Link>
                        <Link href="/contact" className="px-4 py-2 text-white hover:bg-green-100 hover:text-gray-800 transition">
                            Contact
                        </Link>
                        <Link href="/login" className="px-4 py-2 text-white hover:bg-green-100 hover:text-gray-800 transition">
                            Login
                        </Link>
                        <Link href="/signup" className="px-4 py-2 text-white hover:bg-green-100 hover:text-gray-800 transition">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

