import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageCarousel = ({ images, height = "h-48", bgColor = "bg-gray-50" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Autoplay setup
  useEffect(() => {
    if (images && images.length > 1 && !isHovered) {
      intervalRef.current = setInterval(() => {
        nextImage();
      }, 3000); // Change image every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images, isHovered]);

  // Handle hover to pause/resume autoplay
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full ${height} ${bgColor} flex items-center justify-center p-4`}>
        <img
          src="https://via.placeholder.com/150"
          alt="No image"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${height} ${bgColor} flex items-center justify-center p-4 group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        className="w-full h-full object-contain"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-blue-600 hover:bg-opacity-90 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-blue-600 hover:bg-opacity-90 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;