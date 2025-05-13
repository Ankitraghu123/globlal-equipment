import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiFileText, FiChevronDown } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const EnquiryForm = ({ product }) => {
  const { id } = useParams();
  const [productData, setProductData]=useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  
  const loadProducts=async()=>{

    try {
      const response = await axios.get(`http://localhost:8080/enquiry/getproducts/${id}`);
      const prodductData= response.data;
      setProductData(prodductData);
    } catch (error) {
      console.log(error);
    }

}
  useEffect(()=>{
    loadProducts();
  },[]);
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s+-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Ensure product.id is available
      // const id = product?.id || "general"; // Use "general" or any fallback if product ID isn't available
      
      // Make API call to submit enquiry
      const response = await fetch(`http://localhost:8080/enquiry/display/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, productId: id, productName:productData.data.name }), 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // console.log("Enquiry submitted successfully:", data);
      console.log(id,"dsjgbfhadsghjf")

      // Show success toast
      toast.success("Thank you for your enquiry! We'll contact you soon.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        id:id,
      });
      console.log(formData,"hhjhj")

    } catch (error) {
      console.error("Submission error:", error);
      // Show error toast
      toast.error("There was an error submitting your enquiry. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product ? `Enquire About ${product.name}` : "Contact Us"}
          </h1>
          <p className="text-gray-600">
            Fill out the form below and our team will get back to you shortly
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Info (if applicable) */}
              {product && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-800 mb-1">Product Information</h3>
                  <p className="text-sm text-gray-700">{product.name}</p>
                  {product.model && (
                    <p className="text-xs text-gray-500 mt-1">Model: {product.model}</p>
                  )}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? "border-red-300" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.phone ? "border-red-300" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.message ? "border-red-300" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Please provide details about your enquiry..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>We typically respond within 1-2 business days</p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
