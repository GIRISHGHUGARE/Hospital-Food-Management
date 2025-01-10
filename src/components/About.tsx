"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import adminImage from "../assets/adminImage.webp";
import pantryImage from "../assets/pantryImage.webp";
import patientImage from "../assets/patientImage.webp";

const About: React.FC = () => {
    // Images for the carousel
    const images = [adminImage, pantryImage, patientImage];
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Function to rotate images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [images.length]);

    // Framer Motion variants for text animation
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    return (
        <section id="about" className="px-4 lg:px-20 py-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between space-y-8 lg:space-y-0">
                {/* About Us Text Section */}
                <motion.div
                    className="lg:w-1/2 text-center lg:text-left space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is in view
                    variants={textVariants}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                        About Us
                    </h2>
                    <p className="text-base lg:text-lg text-stone-400 leading-relaxed">
                        Our Hospital Food Delivery Management System streamlines meal planning and delivery for patients, ensuring timely and accurate meals. By integrating modern technology, we enhance collaboration between food managers, pantry staff, and delivery personnel.
                        Our goal is to create a seamless and patient-focused experience, improving efficiency while meeting specific dietary needs.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-6 px-8 py-3 text-sm lg:text-lg font-bold border-[2px] text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Learn More
                    </motion.button>
                </motion.div>

                {/* Rotating Image Section */}
                <div className="lg:w-1/2 flex items-center justify-center relative">
                    {images.map((image, index) => {
                        const visibilityClass =
                            index === currentIndex
                                ? "opacity-100 scale-100 z-30"
                                : index === (currentIndex + 1) % images.length
                                    ? "opacity-70 scale-90 z-20"
                                    : "opacity-0 scale-80 z-10";

                        return (
                            <motion.div
                                key={index}
                                className={`absolute w-4/5 h-auto transition-all duration-1000 ease-in-out ${visibilityClass}`}
                                style={{
                                    top: index === currentIndex ? "0%" : "10%",
                                    left: index === currentIndex ? "5%" : "15%",
                                }}
                            >
                                <Image
                                    src={image}
                                    alt={`About Us ${index + 1}`}
                                    className="object-cover rounded-lg"
                                    priority={index === currentIndex}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
