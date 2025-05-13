import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import hero1 from "../../assets/images/slider-mainbg-01.jpg"; 
import hero2 from "../../assets/images/slider-mainbg-01.jpg"; 
import hero3 from "../../assets/images/slider-mainbg-01.jpg"; 


const slides = [
  {
    id: 1,
    image: hero1,
    title: "Sliding Compound Miter Saw",
    subtitle: "Professional Precision Cutting",
    offer: "Save Up To $29 Instantly",
    buttonText: "SHOP NOW!",
    link: "/shop",
    textPosition: "text-left items-start", // Added for positioning control
    textColor: "text-white",
    overlay: "bg-gradient-to-r from-black/80 to-transparent",
  },
  {
    id: 2,
    image: hero2,
    title: "Powerful Drill Machines",
    subtitle: "Industrial Grade Performance",
    offer: "Flat 30% Off on Selected Models",
    buttonText: "GRAB DEAL!",
    link: "/deals",
    textPosition: "text-center items-center",
    textColor: "text-white",
    overlay: "bg-gradient-to-b from-black/70 to-transparent",
  },
  {
    id: 3,
    image: hero3,
    title: "High-Quality Paint Supplies",
    subtitle: "Professional Finish Every Time",
    offer: "Buy 1 Get 1 Free",
    buttonText: "EXPLORE NOW",
    link: "/paints",
    textPosition: "text-right items-end",
    textColor: "text-gray-900",
    overlay: "bg-gradient-to-l from-white/60 to-transparent",
  },
];

const HeroSlider = () => {
  return (
    <div className="relative group  ">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1000}
        className="w-full "
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative flex ${slide.textPosition} justify-center  w-full md:py-16`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 ${slide.overlay}`} />
              
              {/* Content */}
              <div className={`relative z-50 flex flex-col justify-center  max-w-6xl w-full px-8 pb-24 ${slide.textPosition} ${slide.textColor}`}>
                <div className="max-w-xl space-y-4 transform transition-all duration-700 ease-out translate-y-10 opacity-0 animate-fadeIn">
                  {/* Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-yellow-500 text-gray-900 rounded-full">
                    Limited Offer
                  </span>
                  
                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-lg sm:text-xl opacity-90">
                    {slide.subtitle}
                  </p>
                  
                  {/* Offer */}
                  <p className="text-xl sm:text-2xl font-semibold text-yellow-400">
                    {slide.offer}
                  </p>
                  
                  {/* Button */}
                  <div className="pt-4">
                    <Link
                      to={slide.link}
                      className="inline-block px-8 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center justify-center w-12 h-12 my-auto ml-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 swiper-button-prev">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      
      <div className="absolute inset-y-0 right-0 z-20 flex items-center justify-center w-12 h-12 my-auto mr-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 swiper-button-next">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="swiper-pagination-bullet w-2 h-2 rounded-full bg-white opacity-50 transition-all duration-300 hover:opacity-100 hover:w-4"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;