// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { FaSearchPlus, FaLock } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Slider from "react-slick";

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState("Description");
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/product/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Failed to fetch product", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <div className="p-6">Loading...</div>;

//   const carouselSettings = {
//     dots: true,
//     arrows: true,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
//       <div className="grid md:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl overflow-hidden">
//         {/* Carousel or Single Image */}
//         <div className="relative">
//           {product.images.length > 1 ? (
//             <Slider {...carouselSettings}>
//               {product.images.map((img, idx) => (
//                 <div key={idx}>
//                   <img
//                     src={img}
//                     alt={`product-${idx}`}
//                     className="w-full h-96 object-contain"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           ) : (
//             <img
//               src={product.images[0] || "https://via.placeholder.com/400"}
//               alt={product.name}
//               className="w-full h-96 object-contain"
//             />
//           )}
//           <button className="absolute top-4 left-4 bg-blue-900 text-white p-2 rounded-md">
//             <FaSearchPlus />
//           </button>
//         </div>

//         {/* Right Info */}
//         <div className="bg-blue-100 p-6 flex flex-col justify-between">
//           <div>
//             <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
//             <p className="text-sm font-semibold mb-4">Model No : N/A</p>
//             <div
//               className="mb-4"
//               dangerouslySetInnerHTML={{ __html: product.description }}
//             />
//             <Link to="/enquiry">
//               <button className="bg-blue-900 text-white py-2 px-4 flex items-center gap-2 rounded-md hover:bg-blue-800">
//                 <FaLock /> Send Enquiry
//               </button>
//             </Link>
//           </div>

//           <p className="text-sm mt-6">
//             Category:{" "}
//             <span className="font-bold">{product.category?.name}</span> | Subcategory:{" "}
//             <span className="font-bold">{product.subCategory?.name}</span>
//           </p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="mt-10 border rounded-md overflow-hidden">
//         <div className="flex">
//           <button
//             className={`flex-1 text-center py-3 font-semibold transition duration-300 ${
//               activeTab === "Description"
//                 ? "bg-blue-900 text-white"
//                 : "bg-white text-black"
//             }`}
//             onClick={() => setActiveTab("Description")}
//           >
//             Description
//           </button>
//           <button
//             className={`flex-1 text-center py-3 font-semibold transition duration-300 ${
//               activeTab === "Specification"
//                 ? "bg-orange-600 text-white"
//                 : "bg-white text-black"
//             }`}
//             onClick={() => setActiveTab("Specification")}
//           >
//             Specification
//           </button>
//         </div>

//         <div className="bg-white p-6">
//           {activeTab === "Description" && (
//             <div dangerouslySetInnerHTML={{ __html: product.description }} />
//           )}
//           {activeTab === "Specification" && (
//             product.specialization ? (
//               <div dangerouslySetInnerHTML={{ __html: product.specialization }} />
//             ) : (
//               <p>No specifications available.</p>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearchPlus, FaLock } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Description");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEnquiryClick = (e) => {
    e.preventDefault();
    navigate(`/enquiry/${id}`);
  };

  const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      <div className="grid md:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Product Images */}
        <div className="relative">
          {product.images?.length > 1 ? (
            <Slider {...carouselSettings}>
              {product.images.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    alt={`${product.name} - ${idx + 1}`}
                    className="w-full h-96 object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400?text=Product+Image";
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={product.images?.[0] || "https://via.placeholder.com/400?text=Product+Image"}
              alt={product.name}
              className="w-full h-96 object-contain"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=Product+Image";
              }}
            />
          )}
          <button 
            className="absolute top-4 left-4 bg-blue-900 text-white p-2 rounded-md"
            aria-label="Zoom image"
          >
            <FaSearchPlus />
          </button>
        </div>

        {/* Product Info */}
        <div className="bg-blue-100 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm font-semibold mb-4">
              Model No : {product.modelNumber || "N/A"}
            </p>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
            />
            <button 
              onClick={handleEnquiryClick}
              className="bg-blue-900 text-white py-2 px-4 flex items-center gap-2 rounded-md hover:bg-blue-800"
            >
              <FaLock /> Send Enquiry
            </button>
          </div>

          <p className="text-sm mt-6">
            Category: <span className="font-bold">{product.category?.name || "N/A"}</span> | 
            Subcategory: <span className="font-bold">{product.subCategory?.name || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 border rounded-md overflow-hidden">
        <div className="flex" role="tablist">
          {["Description", "Specification"].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`flex-1 text-center py-3 font-semibold transition duration-300 ${
                activeTab === tab
                  ? tab === "Description"
                    ? "bg-blue-900 text-white"
                    : "bg-orange-600 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white p-6">
          {activeTab === "Description" && (
            <div dangerouslySetInnerHTML={{ __html: product.description || "No description available." }} />
          )}
          {activeTab === "Specification" && (
            product.specialization ? (
              <div dangerouslySetInnerHTML={{ __html: product.specialization }} />
            ) : (
              <p>No specifications available.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
