"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Background from "../assets/background.webp";
import chatbotIcon from "../assets/chatbotIcon.png";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

const Home: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/chatbot");
  };

  return (
    <section id="home" className="overflow-x-hidden">
      {/* Background and Gradient Wrapper */}
      <div
        className="relative min-h-screen w-screen overflow-y-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${Background.src})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <Header />
          <Hero />
          <div className="h-20"></div>
          <About />
          <div className="h-40"></div>
          <Services />
          <div className="h-10"></div>
          <ContactUs />
          <Footer />
        </div>

        {/* Circular Button */}
        <button
          className="fixed bottom-14 right-5 w-20 h-20 bg-creme text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brown transition duration-300 z-20"
          onClick={handleButtonClick}
        >
          <Image
            src={chatbotIcon}
            alt="Chatbot Icon"
            className="w-30 h-30"
          />
        </button>
      </div>
    </section>
  );
};

export default Home;
