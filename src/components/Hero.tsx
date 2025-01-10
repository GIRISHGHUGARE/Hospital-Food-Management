"use client";

import { useRouter } from "next/navigation";
import Background from "../assets/background.webp";

const Hero: React.FC = () => {
    const router = useRouter(); // Initialize router for navigation

    const handleExploreClick = () => {
        // Navigate to the menu page when the Explore button is clicked
        router.push("/menu");
    };

    return (
        <div
            className="relative h-screen flex flex-col justify-center items-center md:items-start px-6 md:px-16 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${Background.src})`,
            }}
        >
            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content Section */}
            <div className="relative z-10 text-center md:text-left max-w-3xl">
                <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-6xl leading-snug animate-slide-up">
                    Nourishing Health, <br /> Managing Meals
                </h1>
                <p className="text-gray-300 mt-4 text-base md:text-lg lg:text-xl">
                    Empowering hospitals with efficient meal planning and management.
                </p>
                <button
                    onClick={handleExploreClick}
                    type="button"
                    className="relative z-10 flex items-center gap-3 mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base lg:text-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-transform border-2 border-transparent rounded-full group"
                >
                    Explore Menu
                    <svg
                        className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Hero;
