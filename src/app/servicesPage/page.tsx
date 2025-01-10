import Header from '@/components/Header'
import React from 'react'
import Background from "../../assets/background.webp";
import Services from '@/components/Services';

function page() {
    return (
        <>
            <div className="relative h-screen w-screen overflow-y-auto">
                {/* Background Image */}
                <div
                    className="absolute inset-0 opacity-90 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${Background.src})`,
                    }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
                <div className="relative z-10">
                    <Header />
                    <div className="h-28"></div>
                    <div className='text-white'>
                        <Services />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page