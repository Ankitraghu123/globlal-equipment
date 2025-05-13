
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FiCalendar, FiArrowRight, FiDownload, FiEye } from "react-icons/fi";
// import { CiSearch } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const BlogPage = () => {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categories, setCategories] = useState(["All"]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBrochure, setSelectedBrochure] = useState(null);

//   // Fetch categories and products on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch categories
//         const categoryResponse = await axios.get("http://localhost:8080/category");
//         const fetchedCategories = categoryResponse.data.map((cat) => cat.name);
//         setCategories(["All", ...fetchedCategories]);

//         // Fetch products
//         const productResponse = await axios.get("http://localhost:8080/product");
//         const formattedProducts = productResponse.data.map((product) => ({
//           id: product._id,
//           title: product.name,
//           category: product.category.name,
//           image: product.images[0] || "https://via.placeholder.com/150", // Fallback image
//           date: "N/A", // Placeholder (update if API provides)
//           description: "No description available", // Placeholder (update if API provides)
//           readTime: "5 min read", // Placeholder
//           brochure: product.PDFbrochure, // Include brochure URL
//         }));
//         setProducts(formattedProducts);

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter products based on category and search term
//   const filteredProducts = products.filter((item) => {
//     const matchesCategory = activeCategory === "All" || item.category === activeCategory;
//     const matchesSearch =
//       item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.category.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Handle brochure download
//   const handleDownload = async (url, filename) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const blob = await response.blob();
//       const blobUrl = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(blobUrl);
//     } catch (error) {
//       console.error('Failed to download brochure:', error);
//       alert('Failed to download brochure. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-xl font-medium text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
//         <p className="text-xl font-medium">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section id="primary" className="relative py-20 text-white overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20"></div>
//           <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Equipment Gallery</h1>
//             <p className="text-xl md:text-2xl max-w-3xl mx-auto">
//               Browse our premium collection of industrial equipment and tools
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Blog Grid Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Search and Filter Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
//           {/* Search Bar */}
//           <div className="relative w-full md:w-96">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <CiSearch className="text-gray-400 text-xl" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search equipment by name or category..."
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Category Filters */}
//           <div className="w-full md:w-auto">
//             <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
//               {categories.map((category) => (
//                 <button
//                   type="button"
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
//                     activeCategory === category
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Equipment Grid */}
//         {filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProducts.map((product) => (
//               <Link key={product.id} to="/product" onClick={() => window.scrollTo(0, 0)}>
//                 <motion.article
//                   className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="relative">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-full sm:h-56 object-cover"
//                       loading="lazy"
//                     />
//                   </div>

//                   <div className="p-6">
//                     <div className="flex items-center text-gray-500 text-sm mb-3">
//                       <FiCalendar className="mr-1" />
//                       <span>{product.date}</span>
//                       <span className="mx-2">•</span>
//                       <span>{product.readTime}</span>
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
//                       {product.title}
//                     </h3>

//                     <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center text-blue-600 font-medium group">
//                         <span className="mr-2 group-hover:mr-3 transition-all">View Details</span>
//                         <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//                       </div>
//                       {product.brochure && (
//                         <div className="flex justify-end items-center gap-2">
//                           <span className="text-gray-600">Brochure</span>
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation(); // Prevent Link navigation and scroll
//                               setSelectedBrochure(product.brochure);
//                             }}
//                             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
//                           >
//                             <FiEye className="text-sm" />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation(); // Prevent Link navigation and scroll
//                               handleDownload(product.brochure, `${product.title}_brochure.pdf`);
//                             }}
//                             className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
//                           >
//                             <FiDownload className="text-sm" />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </motion.article>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-gray-50 rounded-xl">
//             <div className="max-w-md mx-auto">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <h3 className="mt-4 text-xl font-medium text-gray-700">No equipment found</h3>
//               <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setActiveCategory("All");
//                   setSearchTerm("");
//                 }}
//                 className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Load More Button */}
//         <div className="text-center mt-12">
//           <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//             Load More Equipment
//           </button>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="bg-gray-100 py-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//             Stay Updated With Our Newsletter
//           </h2>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Get the latest equipment updates, news, and resources delivered straight to your inbox
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Brochure Modal */}
//       {selectedBrochure && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold">Product Brochure</h2>
//                 <button
//                   type="button"
//                   onClick={() => setSelectedBrochure(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <iframe
//                 src={selectedBrochure}
//                 className="w-full h-[70vh]"
//                 title="Product Brochure"
//                 frameBorder="0"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default BlogPage;



// app/gallery/page.jsx
import React from 'react';
import { FiHeart, FiShare2, FiDownload } from 'react-icons/fi';

const GalleryPage = () => {
  const images = [
    {
      id: 1,
      title: "Manual Scissor Table",
      url: "https://sankalpeasymove.com/wp-content/uploads/2025/01/Haf4f606e46774332ac9540c52df4a016m.jpg_720x720q50.avif",
      likes: 1243,
      downloads: 856,
    },
    {
      id: 2,
      title: "Hand Pallet Truck",
      url: "https://sankalpeasymove.com/wp-content/uploads/2018/05/hand-pallet-truck1.png",
      likes: 892,
      downloads: 542,
    },
    {
      id: 3,
      title: "Semi Battery Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/semi-battery-stacker-441x441.png",
      likes: 1567,
      downloads: 923,
    },
    {
      id: 4,
      title: "Reel Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/paper-roll-stacker-441x441.jpg",
      likes: 723,
      downloads: 412,
    },
    {
      id: 5,
      title: "Hand Pallet Truck",
      url: "https://www.rudraequipment.in/wp-content/webp-express/webp-images/uploads/2020/01/hand-pallet-4-768x768.png.webp",
      likes: 2310,
      downloads: 1423,
    },
    {
      id: 3,
      title: "Semi Battery Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/semi-battery-stacker-441x441.png",
      likes: 1567,
      downloads: 923,
    },
    {
      id: 3,
      title: "Semi Battery Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/semi-battery-stacker-441x441.png",
      likes: 1567,
      downloads: 923,
    },
    {
      id: 4,
      title: "Reel Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/paper-roll-stacker-441x441.jpg",
      likes: 723,
      downloads: 412,
    },
    {
      id: 5,
      title: "Hand Pallet Truck",
      url: "https://www.rudraequipment.in/wp-content/webp-express/webp-images/uploads/2020/01/hand-pallet-4-768x768.png.webp",
      likes: 2310,
      downloads: 1423,
    },
    {
      id: 3,
      title: "Semi Battery Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/semi-battery-stacker-441x441.png",
      likes: 1567,
      downloads: 923,
    },
    {
      id: 1,
      title: "Manual Scissor Table",
      url: "https://sankalpeasymove.com/wp-content/uploads/2025/01/Haf4f606e46774332ac9540c52df4a016m.jpg_720x720q50.avif",
      likes: 1243,
      downloads: 856,
    },
    {
      id: 2,
      title: "Hand Pallet Truck",
      url: "https://sankalpeasymove.com/wp-content/uploads/2018/05/hand-pallet-truck1.png",
      likes: 892,
      downloads: 542,
    },
    {
      id: 3,
      title: "Semi Battery Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/semi-battery-stacker-441x441.png",
      likes: 1567,
      downloads: 923,
    },
    {
      id: 4,
      title: "Reel Stacker",
      url: "https://sankalpeasymove.com/wp-content/uploads/2024/11/paper-roll-stacker-441x441.jpg",
      likes: 723,
      downloads: 412,
    },
    {
      id: 5,
      title: "Hand Pallet Truck",
      url: "https://www.rudraequipment.in/wp-content/webp-express/webp-images/uploads/2020/01/hand-pallet-4-768x768.png.webp",
      likes: 2310,
      downloads: 1423,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of stunning images from around the world
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className=" aspect-h-9 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className=" h-50 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>

                <div className="flex items-center justify-between text-white/80 text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FiHeart className="mr-1" /> {image.likes}
                    </span>
                    <span className="flex items-center">
                      <FiDownload className="mr-1" /> {image.downloads}
                    </span>
                  </div>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;