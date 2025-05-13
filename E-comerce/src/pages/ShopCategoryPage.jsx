import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageCarousel from "./ImageCarousel";

const ShopCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      // Structure categories
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
              })),
          }))
          .filter((sub) => sub.products.length > 0);
        return {
          category: cat.name,
          _id: cat._id,
          subCategories,
        };
      });

      // Create flat products array for default view
      const allProducts = productsData.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        images: prod.images || [],
      }));

      setCategories(structuredCategories);
      setAllProducts(allProducts);

      // Check location.state for pre-selected category
      const { selectedCategory: passedCategory } = location.state || {};
      if (passedCategory) {
        const matchedCategory = structuredCategories.find(
          (cat) => cat.category === passedCategory.category
        );
        setSelectedCategory(matchedCategory || null);
      }
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

  const handleCategoryChange = (e) => {
    const selectedCatIndex = e.target.value;
    setSelectedCategory(selectedCatIndex === "" ? null : categories[selectedCatIndex]);
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCatIndex = e.target.value;
    const selectedSubCat = selectedCategory.subCategories[selectedSubCatIndex];
    navigate("/subcategory-products", {
      state: {
        subCategory: selectedSubCat,
        parentCategory: selectedCategory.category,
        categoryData: selectedCategory,
      },
    });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!categories.length || allProducts.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-[1600px] text-center">
        <p className="text-xl text-gray-600">No products available.</p>
      </div>
    );
  }

  // Determine products to display
  let displayProducts = allProducts;
  if (selectedCategory) {
    displayProducts = selectedCategory.subCategories
      .flatMap((subCat) => subCat.products)
      .map((prod) => ({
        _id: prod._id,
        name: prod.name,
        images: prod.images,
      }));
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-[1600px] bg-gray-100 min-h-screen z-30  pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <select
          className="border rounded-lg px-4 py-2 bg-white w-full sm:w-64"
          onChange={handleCategoryChange}
          value={
            selectedCategory
              ? categories.findIndex((cat) => cat._id === selectedCategory._id)
              : ""
          }
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={cat._id} value={idx}>
              {cat.category}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <select
            className="border rounded-lg px-4 py-2 bg-white w-full sm:w-64"
            onChange={handleSubCategoryChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {selectedCategory.subCategories.map((subCat, idx) => (
              <option key={subCat._id} value={idx}>
                {subCat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          displayProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleProductClick(product)}
            >
              <ImageCarousel images={product.images} />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h4>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopCategoryPage;