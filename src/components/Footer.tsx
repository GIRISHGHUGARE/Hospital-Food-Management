"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-brown to-olive text-white mt-20 py-6">
            <div className="container mx-auto px-4">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="cursor-pointer">
                            <Image src={Logo} alt="Logo" className="h-40 w-40" priority />
                        </Link>
                    </motion.div>

                    {/* Quick Links and Legal Sections */}
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-lg text-white font-semibold">QUICK LINKS</h3>
                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-100 hover:underline cursor-pointer"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-100  hover:underline cursor-pointer"
                                    >
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/services"
                                        className="text-gray-100  hover:underline cursor-pointer"
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-100  hover:underline cursor-pointer"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Legal */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h3 className="text-lg text-white  font-semibold">LEGAL</h3>
                            <ul>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className="text-gray-100  hover:underline cursor-pointer"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-gray-100 hover:underline cursor-pointer"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-2 mx-1 border-white border-[2px]" />

                {/* Footer Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full sm:flex sm:items-center sm:justify-between"
                >
                    {/* Copyright */}
                    <p className="text-sm ml-6 text-white">
                        &copy; 2024 HealthyBites™. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="mt-4 me-6 flex space-x-6 sm:mt-0 sm:justify-center">
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            className="text-white bg-white bg-opacity-20 p-2 rounded-full cursor-pointer"
                        >
                            <FaFacebook className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            className="text-white bg-white bg-opacity-20 p-2 rounded-full cursor-pointer"
                        >
                            <FaInstagram className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2 }}
                            className="text-white bg-white bg-opacity-20 p-2 rounded-full cursor-pointer"
                        >
                            <FaTwitter className="h-5 w-5" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
