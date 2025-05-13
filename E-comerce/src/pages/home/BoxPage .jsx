import React from "react";
import { motion } from "framer-motion";

const BoxPage = () => {
  const sections = [
    {
      icon: "🚚",
      title: "MISSION",
      text: "To bring the finest technology equipment and services to the world, empowering industries and individuals to achieve their highest potential. We strive to innovate.",
    },
    {
      icon: "🔄",
      title: "VISION",
      text: "Our company philosophy has always focused on customer satisfaction with uncompromising integrity. Puma Lift carries products and services with the finest value and quality in the market.",
    },
    {
      icon: "💬",
      title: "QUALITY POLICY",
      text: "Puma Lift Trucks Pvt Ltd is committed to sell the safest and the most efficient material handling equipment by continually improving the product, resources & technical capabilities.",
    },
  ];

  return (
    <div className="bg-gray-100 relative">
    {/* Wrapper to center content */}
    <div  className="mx-auto ">
      {/* Mission, Vision, Quality Section */}
      <div style={{ width:"100vw" }} className="flex flex-col md:flex-row md:absolute -top-32 z-30 justify-center items-center gap-10  py-12">
        {sections.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center transform transition duration-300 hover:-translate-y-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="font-bold text-lg mt-4">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>

  );
};

export default BoxPage;
