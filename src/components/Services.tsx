"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import DietChartImage from "../assets/dietChart.webp";
import PantryImage from "../assets/pantryImage.webp";
import DeliveryImage from "../assets/deliveryImage.webp";
import DashboardImage from "../assets/dashboardImage.webp";

const servicesData = [
    {
        title: "Patient Diet Management",
        description:
            "Manage patient details, including dietary requirements, allergies, and specific instructions to create customized diet charts.",
        buttonText: "Learn More",
        image: DietChartImage,
    },
    {
        title: "Pantry Management",
        description:
            "Oversee pantry operations, assign tasks to staff, and track meal preparation for patients efficiently.",
        buttonText: "Explore Features",
        image: PantryImage,
    },
    {
        title: "Delivery Tracking",
        description:
            "Monitor meal deliveries to patient rooms in real time. Track delivery personnel and update statuses seamlessly.",
        buttonText: "Track Deliveries",
        image: DeliveryImage,
    },
    {
        title: "Comprehensive Dashboards",
        description:
            "Use real-time dashboards to monitor operations, track delivery statuses, and receive alerts for delayed tasks.",
        buttonText: "View Dashboard",
        image: DashboardImage,
    },
];

const Services: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? servicesData.length - 1 : prevIndex - 1
        );
    };

    return (
        <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 mt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        Our Services
                    </h2>
                </div>
                <div className="relative max-w-4xl mx-auto">
                    {/* Card */}
                    <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500">
                        {/* Image Content */}
                        <div className="w-full sm:w-1/2">
                            <Image
                                src={servicesData[currentIndex].image}
                                alt={servicesData[currentIndex].title}
                                className="w-full h-48 sm:h-full object-cover"
                            />
                        </div>
                        {/* Text Content */}
                        <div className="p-6 sm:p-8 w-full sm:w-1/2">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                                {servicesData[currentIndex].title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                {servicesData[currentIndex].description}
                            </p>
                            <button className="px-4 sm:px-6 py-2 sm:py-3 border text-black rounded-lg shadow-md hover:scale-105 transition-transform">
                                {servicesData[currentIndex].buttonText}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                        aria-label="Previous Service"
                    >
                        <FaChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                        aria-label="Next Service"
                    >
                        <FaChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
