// import { useEffect, useState } from 'react';
// import { CiSearch } from 'react-icons/ci';
// import { FiDownload, FiEye } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function EquipmentGallery() {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [categories, setCategories] = useState(['All']);
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
//         const categoryResponse = await axios.get('http://localhost:8080/category');
//         const fetchedCategories = categoryResponse.data.map(cat => cat.name);
//         setCategories(['All', ...fetchedCategories]);

//         // Fetch products
//         const productResponse = await axios.get('http://localhost:8080/product');
//         const formattedProducts = productResponse.data.map(product => ({
//           id: product._id,
//           name: product.name,
//           category: product.category.name,
//           img: product.images[0] || 'https://via.placeholder.com/150', // Fallback image
//           rating: 4.0, // Placeholder (update if backend provides)
//           brochure: product.PDFbrochure, // Include brochure URL
//         }));
//         setProducts(formattedProducts);

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter products based on category and search term
//   const filteredEquipment = products.filter(item => {
//     const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
//       <div className="text-center py-16">
//         <p className="text-xl font-medium text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-16 bg-gray-50 rounded-xl">
//         <p className="text-xl font-medium text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Equipment Gallery</h2>
//         <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
//         <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//           Browse our premium collection of industrial equipment and tools
//         </p>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
//         {/* Search Bar */}
//         <div className="relative w-full md:w-96">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <CiSearch className="text-gray-400 text-xl" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search equipment by name or category..."
//             className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Category Filters */}
//         <div className="w-full md:w-auto">
//           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map(category => (
//               <button
//                 type="button"
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
//                   activeCategory === category
//                     ? 'bg-blue-600 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Equipment Grid */}
//       {filteredEquipment.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredEquipment.map(item => (
//             <div key={item.id} className="flex flex-col">
//               <Link to="/product" >
//                 <div
//                   className="group bg-white rounded-lg shadow-md hover:shadow-xl p-4 border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1"
//                   onMouseEnter={() => setHoveredItem(item.id)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   {/* Image Container */}
//                   <div className="relative overflow-hidden w-full h-64 bg-gray-50">
//                     <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center p-4">
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         className="w-full object-contain rounded"
//                       />
//                     </div>
//                   </div>

//                   {/* Equipment Details */}
//                   <div className="p-5 flex justify-between items-center gap-4" >
//                     <div className="">
//                       <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
//                     </div>
//                     {item.brochure && (
//                 <div className="flex justify-end items-center  gap-2 ">
//                   <span className="text-gray-600">Brochure</span>
//                   <button
//                     type="button"
//                     onClick={e => {
//                       e.preventDefault();
//                       e.stopPropagation(); // Prevent event bubbling to Link
//                       setSelectedBrochure(item.brochure);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
//                   >
//                     <FiEye className="text-sm" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={e => {
//                       e.preventDefault();
//                       e.stopPropagation(); // Prevent event bubbling to Link
//                       handleDownload(item.brochure, `${item.name}_brochure.pdf`);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
//                   >
//                     <FiDownload className="text-sm" />
//                   </button>
//                 </div>
//               )}
//                   </div>
//                     {/* Buttons Outside Link */}
             
//                 </div>
                
//               </Link>
            
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-16 bg-gray-50 rounded-xl">
//           <div className="max-w-md mx-auto">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <h3 className="mt-4 text-xl font-medium text-gray-700">No equipment found</h3>
//             <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
//             <button
//               type="button"
//               onClick={() => {
//                 setActiveCategory('All');
//                 setSearchTerm('');
//               }}
//               className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       )}

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
//     </section>
//   );
// }





import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FiDownload, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EquipmentGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrochure, setSelectedBrochure] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const categoryResponse = await axios.get('http://localhost:8080/category');
        const fetchedCategories = categoryResponse.data.map(cat => cat.name);
        setCategories(['All', ...fetchedCategories]);

        const productResponse = await axios.get('http://localhost:8080/product/allproduct');
        const formattedProducts = productResponse.data.map(product => ({
          id: product._id,
          name: product.name,
          category: product.category.name,
          img: product.images[0] || 'https://via.placeholder.com/150',
          rating: 4.0,
          brochure: product.PDFbrochure,
        }));
        setProducts(formattedProducts);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEquipment = products.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl">
        <p className="text-xl font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Equipment Gallery</h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Browse our premium collection of industrial equipment and tools
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="text-gray-400 text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search equipment by name or category..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-auto">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredEquipment.map(item => (
            <div key={item.id} className="flex flex-col">
              <Link to={`/product/${item.id}`}>
                <div
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl p-4 border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden w-full h-64 bg-gray-50">
                    <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center p-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full object-contain rounded"
                      />
                    </div>
                  </div>

                  {/* Equipment Details */}
                  <div className="p-5 flex justify-between items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                    {item.brochure && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedBrochure(item.brochure);
                          }}
                          className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDownload(item.brochure, `${item.name}_brochure.pdf`);
                          }}
                          className="flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                          <FiDownload />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-medium text-gray-700">No equipment found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchTerm('');
            }}
            className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Filters
          </button>
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
    </section>
  );
}
