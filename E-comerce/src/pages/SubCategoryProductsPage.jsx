import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import ImageCarousel from "./ImageCarousel";

const SubCategoryProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subCategory, parentCategory, categoryData } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subCategory) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/product");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const filteredProducts = data
          .filter((prod) => prod.subCategory._id === subCategory._id)
          .map((prod) => ({
            _id: prod._id,
            name: prod.name,
            images: prod.images || [],
            description: prod.description,
            specialization: prod.specialization,
            category: prod.category,
            subCategory: prod.subCategory,
            brochure: prod.PDFbrochure[0] || null,
          }));
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategory]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  const handleDownloadBrochure = (brochureUrl, e) => {
    e.stopPropagation();
    if (brochureUrl) {
      window.open(brochureUrl, "_blank");
    }
  };

  const handleCategoryClick = () => {
    navigate("/shop/category", { state: { selectedCategory: categoryData } });
  };

  if (!subCategory) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center z-30">
        <p className="text-xl text-gray-600">No subcategory selected.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-[1600px] bg-gray-50 min-h-screen z-30  pb-20 md:pb-0">
      {/* Breadcrumb and Title */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button
          onClick={handleCategoryClick}
          className="hover:text-blue-600 transition-colors"
        >
          {parentCategory}
        </button>
        <span>/</span>
        <span className="font-medium text-blue-600">{subCategory.name}</span>
      </div>

      {/* Loading, Error, or Empty States */}
      {loading ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No products available.</p>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product)}
            >
              <ImageCarousel images={product.images} />
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2 hover:text-blue-600">
                  {product.name}
                </h3>
                <div className="mt-auto space-y-2">
                  {product.brochure && (
                    <button
                      onClick={(e) => handleDownloadBrochure(product.brochure, e)}
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-blue-600 text-gray-700 py-2 rounded-lg transition-colors"
                    >
                      <FiDownload className="w-4 h-4" />
                      Brochure
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategoryProductsPage;