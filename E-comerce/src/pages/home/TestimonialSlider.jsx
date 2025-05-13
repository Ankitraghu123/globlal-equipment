import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Working with this company has been transformative for our business. Their equipment is top-notch and their service is exceptional. We've seen a 40% increase in productivity since we started using their solutions.",
    name: "Johnson Williams",
    role: "CEO, Creative Idea",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 2,
    text: "The quality and durability of their products exceeded our expectations. Their team provided excellent support throughout the purchasing process and helped us find the perfect solutions for our warehouse needs.",
    name: "Emily Carter",
    role: "Operations Manager, XYZ Corp",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4
  },
  {
    id: 3,
    text: "As a long-time customer, I can confidently say their equipment stands the test of time. We've been using their pallet racks for over 5 years with zero issues. Their after-sales service is also remarkable.",
    name: "Michael Smith",
    role: "Logistics Director, ABC Industries",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5
  },
  {
    id: 4,
    text: "The installation team was professional and efficient. They completed the job ahead of schedule and trained our staff thoroughly. We're extremely satisfied with both the products and the service.",
    name: "Sarah Johnson",
    role: "Facility Manager, Mega Storage",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5
  }
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section 
      className="relative py-16 md:py-6 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-[#2457AA] mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from businesses that trust our solutions
          </p>
        </div>

        <div className="relative h-[400px] md:h-[350px] lg:h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={testimonials[index].id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 md:px-10 max-w-4xl w-full border border-gray-700 shadow-lg">
                <FaQuoteLeft className="text-green-400 text-2xl mb-4 opacity-70" />
                
                <p className="text-lg md:text-lg text-gray-200 italic font-medium leading-relaxed">
                  {testimonials[index].text}
                </p>
                
                <FaQuoteRight className="text-green-400 text-2xl mt-4 ml-auto opacity-70" />

                <div className="mt-4 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                  <img 
                    src={testimonials[index].image} 
                    alt={testimonials[index].name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-white">{testimonials[index].name}</h3>
                    <p className="text-green-400 text-sm">{testimonials[index].role}</p>
                    <StarRating rating={testimonials[index].rating} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-5 gap-4 z-50 ">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-[#2457AA] text-white hover:bg-[#1040AA] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2 mx-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${index === i ? 'bg-[#2457AA] w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-[#2457AA] text-white hover:bg-[#1040AA] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;