import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.DOMAIN || "https://hospital-food-management-kjlo.onrender.com/",
  },
};

export default nextConfig;
