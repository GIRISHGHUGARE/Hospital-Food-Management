"use client";

import React from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa"; // Importing icons from React Icons
import { motion } from "framer-motion"; // Importing Framer Motion
import Image from "next/image"; // Next.js Image component
import ContactImg from "../assets/contactImage.webp"; // Importing the image

const ContactUs: React.FC = () => {
    return (
        <section id="contact">
            <div className="p-8 md:p-16">
                {/* Heading */}
                <motion.h2
                    className="text-4xl font-bold text-center text-white mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Contact Us
                </motion.h2>

                {/* Container */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Left Side: Form */}
                    <motion.div
                        className="w-full md:w-1/3 bg-white p-8 shadow-lg rounded-lg"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h3>

                        {/* Name Input */}
                        <div className="flex items-center border-b border-gray-300 py-2 mb-4">
                            <FaUser className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-transparent focus:outline-none text-gray-700 py-2 px-4 border-2 border-olive rounded-lg"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex items-center border-b border-gray-300 py-2 mb-4">
                            <FaEnvelope className="text-gray-500 mr-3" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent focus:outline-none text-gray-700 py-2 px-4 border-2 border-olive rounded-lg"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex items-start border-b border-gray-300 py-2 mb-6">
                            <FaCommentDots className="text-gray-500 mr-3 mt-1" />
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full bg-transparent focus:outline-none text-gray-700 py-2 px-4 border-2 border-olive rounded-lg"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-brown transition">
                            Submit
                        </button>
                    </motion.div>

                    {/* Right Side: Image */}
                    <motion.div
                        className="w-full md:w-1/3 flex items-center justify-center"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={ContactImg}
                            alt="Contact Us Illustration"
                            className="rounded-lg shadow-lg object-cover"
                            width={500}
                            height={500}
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
