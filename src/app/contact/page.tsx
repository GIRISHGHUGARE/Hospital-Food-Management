import Header from "@/components/Header";
import React from "react";
import Background from "../../assets/background.webp";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

function Page() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-90 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${Background.src})`,
                }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"></div>

            {/* Main Content */}
            <div className="relative z-10">
                <Header />
                <div className="h-28"></div>
                <ContactUs />
                <Footer />
            </div>
        </div>
    );
}

export default Page;
