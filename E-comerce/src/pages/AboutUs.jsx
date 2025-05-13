import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiClock, FiAward } from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="primary" className="relative py-20 bg-gradient-to-r  text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Company</h1>
            <div className="flex justify-center items-center">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <a href="/" className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white">
                      Home
                    </a>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-1 text-sm font-medium text-white md:ml-2">About Us</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-full h-80 sm:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Our Team"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-2/3">
              <h3 className="text-lg font-bold text-gray-800">Since 2018</h3>
              <p className="text-gray-600 text-sm mt-1">Serving customers with excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
                OUR STORY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Welcome to Global Equipments</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                As we enter the 5th year of our existence, we reflect on our journey with gratitude to all our customers,
                business partners, employees, and well-wishers who have contributed to our progress and growth.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <FiCheckCircle className="text-green-500 text-xl mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Industry Leadership</h3>
                  <p className="text-gray-600">
                    Recognized as among the leading suppliers of Material Handling Equipment in India.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-green-500 text-xl mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Innovation Focus</h3>
                  <p className="text-gray-600">
                    Committed to providing the most innovative Material Handling solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-green-500 text-xl mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Customer Centric</h3>
                  <p className="text-gray-600">
                    Your satisfaction is our top priority in every business interaction.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="primary" className=" text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-700 p-4 rounded-full">
                  <FiCheckCircle className="text-3xl" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">8,705</h1>
              <p className="text-blue-200">Projects Completed</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-700 p-4 rounded-full">
                  <FiUsers className="text-3xl" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">20+</h1>
              <p className="text-blue-200">Team Members</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-700 p-4 rounded-full">
                  <FiClock className="text-3xl" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">6,260</h1>
              <p className="text-blue-200">Hours Worked</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-700 p-4 rounded-full">
                  <FiAward className="text-3xl" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">9,774</h1>
              <p className="text-blue-200">Happy Clients</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To revolutionize the material handling industry through innovative solutions, exceptional service,
                and a commitment to sustainability that benefits our customers, employees, and the environment.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FiCheckCircle className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Quality Assurance</h3>
                    <p className="text-gray-600">
                      Rigorous quality checks at every stage of production and delivery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FiCheckCircle className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Sustainable Practices</h3>
                    <p className="text-gray-600">
                      Eco-friendly manufacturing and business operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Our Mission"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;