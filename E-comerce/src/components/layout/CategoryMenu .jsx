// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiChevronRight } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";









// const shopData = [
//   {
//     category: "Material Handling Equipments",
//     icon: "🛠️",
//     subCategories: [
//       {
//         name: "Pallet Trucks",
//         products: [
//           {
//             name: "Hydraulic Pallet Truck",
//             model: "HPT-25",
//             image: "https://source.unsplash.com/400x300/?hydraulic-pallet-truck",
//             specs: [
//               { label: "Capacity", value: "2500 Kgs" },
//               { label: "Fork Size", value: "1130*520 / 685 mm" },
//               { label: "Weight", value: "85 kg" },
//               { label: "Material", value: "Steel construction" },
//               { label: "Warranty", value: "1 year" }
//             ],
//             description: "Heavy-duty hydraulic pallet truck for efficient material handling in warehouses and industrial settings."
//           },
//           {
//             name: "Roll Pallet Truck",
//             model: "RPT-20",
//             image: "https://source.unsplash.com/400x300/?roll-pallet-truck",
//             specs: [
//               { label: "Capacity", value: "2000 Kgs" },
//               { label: "Fork Size", value: "1000*500 / 600 mm" },
//               { label: "Weight", value: "75 kg" },
//               { label: "Wheels", value: "Nylon rollers" }
//             ]
//           },
//           {
//             name: "High Lift Pallet Truck",
//             model: "HLPT-30",
//             image: "https://source.unsplash.com/400x300/?high-lift-pallet-truck",
//             specs: [
//               { label: "Capacity", value: "3000 Kgs" },
//               { label: "Lift Height", value: "1.5 meters" },
//               { label: "Fork Size", value: "1200*550 mm" }
//             ]
//           }
//         ]
//       },
//       {
//         name: "Stackers",
//         products: [
//           {
//             name: "Manual Stacker",
//             model: "MS-15",
//             image: "https://source.unsplash.com/400x300/?manual-stacker",
//             specs: [
//               { label: "Capacity", value: "1500 Kgs" },
//               { label: "Lift Height", value: "1.2 meters" },
//               { label: "Wheel Type", value: "Polyurethane" }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     category: "Storage Racks",
//     icon: "🗄️",
//     subCategories: [
//       {
//         name: "Warehouse Racks",
//         products: [
//           {
//             name: "Heavy Duty Long Span Racks",
//             model: "HDLS-5000",
//             image: "https://source.unsplash.com/400x300/?warehouse",
//             specs: [
//               { label: "Load Capacity", value: "5000 Kgs per level" },
//               { label: "Material", value: "Structural steel" },
//               { label: "Finish", value: "Powder coated" }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ];

// const CategoryMenu = () => {






//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Fetch categories
//       const catRes = await fetch("http://localhost:8080/category");
//       if (!catRes.ok) throw new Error("Failed to fetch categories");
//       const categoriesData = await catRes.json();
//      setCategories(categoriesData)  // changde
//       // Fetch subcategories
//       const subCatRes = await fetch("http://localhost:8080/subcategory");
//       if (!subCatRes.ok) throw new Error("Failed to fetch subcategories");
//       const subCategoriesData = await subCatRes.json();

//       // Fetch products
//       const prodRes = await fetch("http://localhost:8080/product");
//       if (!prodRes.ok) throw new Error("Failed to fetch products");
//       const productsData = await prodRes.json();

//       // Structure categories for dropdown
//       const structuredCategories = categoriesData.map((cat) => {
//         const subCategories = subCategoriesData
//           .filter((sub) => sub.category === cat._id)
//           .map((sub) => ({
//             name: sub.name,
//             _id: sub._id,
//             products: productsData
//               .filter((prod) => prod.subCategory._id === sub._id)
//               .map((prod) => ({
//                 _id: prod._id,
//                 name: prod.name,
//                 images: prod.images || [],
//                 description: prod.description,
//                 specialization: prod.specialization,
//                 category: prod.category,
//                 subCategory: prod.subCategory,
//               })),
//           }));
//         return {
//           category: cat.name,
//           _id: cat._id,
//           subCategories,
//         };
//       });

//       // Create flat products array
//       const allProducts = productsData.map((prod) => ({
//         _id: prod._id,
//         name: prod.name,
//         images: prod.images || [],
//       }));

//       // setCategories(structuredCategories);
//       setProducts(allProducts);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to load products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


// console.log(categories)

  
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const navigate = useNavigate();

//   const handleCategoryClick = (categoryName) => {
//     const categoryData = shopData.find((cat) => cat.category === categoryName);
//     if (categoryData) {
//       navigate("/shop/category", { state: categoryData });
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="grid grid-cols-1 w-64 bg-white shadow-lg rounded-b-md border-t-2 border-blue-600 p-4">
//         {categories && categories.map((category, index) => (
//           <div
//             key={index}
//             className="group relative"
//             onMouseEnter={() => setHoveredCategory(index)}
//             onMouseLeave={() => setHoveredCategory(null)}
//           >
//             {/* ✅ Clicking this will navigate with state */}
//             <div
//               onClick={() => handleCategoryClick(category.category)}
//               className="flex items-center justify-between cursor-pointer py-2 px-3 font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors duration-200"
//             >
//               {console.log(category)}
//               <span>{category.name}</span>
//               <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
//             </div>

//             {/* Subcategories shown on hover */}
//             <AnimatePresence>
//               {hoveredCategory === index && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute left-full top-0 w-[300px] bg-white shadow-lg border-l border-gray-100 p-4 grid grid-cols-1 gap-2 z-10"
//                 >
//                   {category.subCategories.map((sub, subIndex) => (
//                     <div
//                       key={subIndex}
//                       onClick={() =>
//                         navigate("/subcategory-products", {
//                           state: {
//                             subCategory: sub,
//                             parentCategory: category.category,
//                             icon: category.icon,
//                           },
//                         })
//                       }
//                       className="block font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
//                     >
//                       {sub.name}
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryMenu;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

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
          }));
        return {
          category: cat.name,
          _id: cat._id,
          icon: cat.icon || "📦", // Optional icon if available
          subCategories,
        };
      });

      const allProducts = productsData.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        images: prod.images || [],
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

  const handleCategoryClick = (categoryName) => {
    const categoryData = categories.find((cat) => cat.category === categoryName);
    if (categoryData) {
      navigate("/shop/category", { state: categoryData });
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 w-64 bg-white shadow-lg rounded-b-md border-t-2 border-blue-600 p-4">
        {categories && categories.map((category, index) => (
          <div
            key={index}
            className="group relative"
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Category Item */}
            <div
              onClick={() => handleCategoryClick(category.category)}
              className="flex items-center justify-between cursor-pointer py-2 px-3 font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors duration-200"
            >
              <span>{category.category}</span>
              <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>

            {/* Subcategories shown on hover */}
            <AnimatePresence>
              {hoveredCategory === index && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full top-0 w-[300px] bg-white shadow-lg border-l border-gray-100 p-4 grid grid-cols-1 gap-2 z-10"
                >
                  {Array.isArray(category.subCategories) && category.subCategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() =>
                        navigate("/subcategory-products", {
                          state: {
                            subCategory: sub,
                            parentCategory: category.category,
                            icon: category.icon,
                          },
                        })
                      }
                      className="block font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {sub.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
