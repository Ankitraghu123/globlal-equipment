import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageCarousel from "./ImageCarousel";
import { FiDownload, FiEye } from 'react-icons/fi';

const ShopPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrochure, setSelectedBrochure] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch categories
      const catRes = await fetch("http://localhost:8080/category");
      if (!catRes.ok) throw new Error("Failed to fetch categories");
      const categoriesData = await catRes.json();

      // Fetch subcategories
      const subCatRes = await fetch("http://localhost:8080/subcategory");
      if (!subCatRes.ok) throw new Error("Failed to fetch subcategories");
      const subCategoriesData = await subCatRes.json();

      // Fetch products
      const prodRes = await fetch("http://localhost:8080/product");
      if (!prodRes.ok) throw new Error("Failed to fetch products");
      const productsData = await prodRes.json();

      // Structure categories for dropdown
      const structuredCategories = categoriesData.map((cat) => {
        const subCategories = subCategoriesData
          .filter((sub) => sub.category === cat._id)
          .map((sub) => ({
            name: sub.name,
            _id: sub._id,
            products: productsData
              .filter((prod) => prod.subCategory._id === sub._id)
              .map((prod) => ({
                _id: prod._id,
                name: prod.name,
                images: prod.images || [],
                description: prod.description,
                specialization: prod.specialization,
                category: prod.category,
                subCategory: prod.subCategory,
                brochure: prod.PDFbrochure, // Include brochure
              })),
          }));
        return {
          category: cat.name,
          _id: cat._id,
          subCategories,
        };
      });

      // Create flat products array
      const allProducts = productsData.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        images: prod.images || [],
        brochure: prod.PDFbrochure, // Include brochure
      }));

      setCategories(structuredCategories);
      setProducts(allProducts);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategorySelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

    const categoryData = categories.find((cat) => cat.category === selectedValue);
    if (categoryData) {
      navigate("/shop/category", { state: { selectedCategory: categoryData } });
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  // Handle brochure download
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download brochure:', error);
      alert('Failed to download brochure. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen z-30 pb-20 md:pb-0">
      {/* Header Section */}
      <div id="primary" className="text-center py-12 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Global Equipments Shop</h1>
        <p className="text-lg mt-2">Leading in Material Handling & Storage Solutions</p>
      </div>

      {/* Dropdown Filter */}
      <div className="container mx-auto px-6 pt-6 max-w-[1600px]">
        <div className="mb-10">
          <label className="block mb-2 text-lg font-semibold text-gray-800">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategorySelect}
            className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 shadow-sm bg-white"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading, Error, or Empty States */}
      {loading ? (
        <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center">
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center">
          <p className="text-xl text-gray-600">No products available.</p>
        </div>
      ) : (
        /* Product Grid */
        <div className="container mx-auto px-6 py-12 max-w-[1600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div onClick={() => handleProductClick(product)}>
                  <ImageCarousel images={product.images} />
                  <div className="flex justify-between items-center">
                  <div className="p-6 flex justify-center ">
                    <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
                  </div>
                  {product.brochure && (
                  <div className="p-6  flex justify-end items-center gap-2">
                    <span className="text-gray-600">Brochure</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering product click
                        setSelectedBrochure(product.brochure);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <FiEye className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering product click
                        handleDownload(product.brochure, `${product.name}_brochure.pdf`);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <FiDownload className="text-sm" />
                    </button>
                  </div>
                )}
                  </div>
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Brochure Modal */}
      {selectedBrochure && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Product Brochure</h2>
                <button
                  type="button"
                  onClick={() => setSelectedBrochure(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <iframe
                src={selectedBrochure}
                className="w-full h-[70vh]"
                title="Product Brochure"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
