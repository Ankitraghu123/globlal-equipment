


"use client";

import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../api";
import { Upload } from "lucide-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  Package,
  Search,
  RefreshCw,
  Trash2,
  ShoppingCart,
  Tag,
  Info,
  X,
  Download,
  EyeIcon,
  Plus,
  Edit,
} from "lucide-react";
import { useCart } from "../CartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
const [imageFiles, setImageFiles] = useState([]);
const [imageFilesPdf, setImageFilesPdf] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchCart } = useCart();
  const [addingToCart, setAddingToCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewingBrochure, setIsViewingBrochure] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    specialization: "",
    specification: "",
    category: "",
    subCategory: ""
  });

  console.log(editingProduct, "sdaASasAS")

  const handleToggle = async (id, checked) => {
    if (checked == false){
      checked = true;
    }
    else {
      checked = false;
    }
    await axios.put(`http://localhost:8080/product/${id}/home-visibility`, { homeVisibility: checked });
    loadProducts();
  };


  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      setProducts(products.map(product =>
        product._id === id ? updatedProduct : product
      ));
      setEditingProduct(null);
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  };

  const handleUpdate = ()=>{

  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProduct(editingProduct._id, editFormData);
    if (success) {
      setEditingProduct(null);
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

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
      console.error('Failed to download file:', error);
      alert('Failed to download brochure. Please try again.');
    }
  };

  const deleteP = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await deleteProduct(id);
      if (res.data) {
        setProducts(res.data.data);
        if (selectedProduct?._id === id) {
          setSelectedProduct(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  const changeStatus = async (id, homeVisibility) => {
    const confirmToggle = window.confirm("Are you sure you want to change the visibility of this product?");
    if (!confirmToggle) return;

    try {
      await handleToggle(id, homeVisibility);
    } catch (err) {
      console.error("Failed to update product visibility:", err);
      alert("Failed to update product. Please try again.");
    }
  };
    const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) =>
        ["image/jpeg", "image/png"].includes(file.type) &&
        file.size <= maxFileSize
    );
    if (files.length < e.target.files.length) {
      alert("Some images were rejected due to invalid type or size (>10MB)");
    }
    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePDFChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) =>
        file.type === "application/pdf" && file.size <= maxFileSize
    );
    if (files.length < e.target.files.length) {
      alert("Some PDFs were rejected due to invalid type or size (>10MB)");
    }
    setImageFilesPdf(files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setIsViewingBrochure(false);
  }, [selectedProduct]);

  useEffect(() => {
    if (editingProduct) {
      setEditFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        // description: editingProduct.description || "",

        specialization: editingProduct.specialization || "",
        
       
        category: editingProduct.category?._id || "",
        subCategory: editingProduct.subCategory?._id || "",
        PDFbrochure: editingProduct.PDFbrochure?._id || "",



        
      });
    }
  }, [editingProduct]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = async (productId) => {
    setAddingToCart((prev) => ({ ...prev, [productId]: true }));
    try {
      await fetch(`http://localhost:8080/cart/add/${productId}`, {
        method: "POST",
      });
      await fetchCart();
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      {/* Header */}
      <div className=" px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
            <Package size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Product Catalog</h2>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
            {loading ? '...' : products.length} items
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={loadProducts}
            className={`p-2 rounded-lg ${loading ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
            disabled={loading}
            title="Refresh products"
          >
            <RefreshCw size={18} className={`text-gray-600 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center">
              <Plus size={14} className="mr-1" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                <Skeleton height={180} />
                <div className="p-4">
                  <Skeleton count={2} />
                  <div className="flex justify-between mt-3">
                    <Skeleton width={80} height={30} />
                    <Skeleton circle width={30} height={30} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="p-3 mb-3 rounded-full bg-red-50 text-red-600">
              <X size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Failed to load products</h3>
            <p className="text-gray-500 mb-4 max-w-md">{error}</p>
            <button
              onClick={loadProducts}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="p-3 mb-3 rounded-full bg-gray-100 text-gray-600">
              <Package size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              {searchTerm ? "No matching products" : "No products available"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try adjusting your search or filters"
                : "Check back later or add new products"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 bg-white"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden group">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-300 flex flex-col items-center">
                      <Package size={48} />
                      <span className="text-sm mt-2">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-white text-xs font-medium bg-black/70 hover:bg-black/80 px-2 py-1 rounded"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Info & Actions */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-1" title={product.name}>
                      {product.name}
                    </h3>
                    <div className="flex space-x-1">
                    <Link  to={`/edit/${product._id}`}  >
                      <button
                        className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-blue-600"
                        onClick={() => setEditingProduct(product)}
                        title="Edit product"
                      >
                        <Edit size={16} />
                      </button>
                    </Link>
                      <button
                        className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-red-600"
                        onClick={() => deleteP(product._id)}
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.category && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        <Tag size={12} className="mr-1" />
                        {product.category.name}
                      </span>
                    )}
                    {product.size?.length > 0 && (
                      <div className="flex gap-1">
                        {product.size.map((size) => (
                          <span
                            key={size}
                            className="inline-block px-1.5 py-0.5 text-xs border border-gray-200 rounded text-gray-600 bg-white"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      <button
                        className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600"
                        onClick={() => setSelectedProduct(product)}
                        title="View details"
                      >
                        <Info size={16} />
                      </button>
                    </div>
                    {product.PDFbrochure && (
                      <button
                        onClick={() => handleDownload(product.PDFbrochure, `${product.name}_brochure.pdf`)}
                        className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                        title="Download brochure"
                      >
                        <Download size={14} className="mr-1" />
                        Brochure
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl animate-slideUp">
            <div className="p-6">
              {isViewingBrochure ? (
                selectedProduct.PDFbrochure ? (
                  <>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                      <h2 className="text-xl font-semibold flex items-center">
                        <EyeIcon size={18} className="mr-2 text-blue-600" />
                        Product Brochure
                      </h2>
                      <button
                        onClick={() => setIsViewingBrochure(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <iframe
                        src={selectedProduct.PDFbrochure}
                        className="w-full h-[70vh]"
                        title="Product Brochure"
                        frameBorder="0"
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setIsViewingBrochure(false)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                      >
                        Back to Details
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="p-3 mb-3 inline-flex rounded-full bg-gray-100 text-gray-400">
                      <X size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No Brochure Available</h3>
                    <p className="text-gray-500 mb-4">This product doesn't have an associated brochure.</p>
                    <button
                      onClick={() => setIsViewingBrochure(false)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                    >
                      Back to Product Details
                    </button>
                  </div>
                )
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Image gallery */}
                  {selectedProduct.images?.length > 0 ? (
                    <div className="grid grid-cols-5 gap-3 mb-6">
                      <div className="col-span-5 h-80 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={selectedProduct.images[0]}
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {selectedProduct.images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                          <img
                            src={img}
                            alt={`${selectedProduct.name} ${(idx + 2)}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                      <Package size={64} className="text-gray-300" />
                    </div>
                  )}

                  {/* Meta */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      {selectedProduct.category && (
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</h3>
                          <p className="text-gray-800 font-medium">{selectedProduct.category.name}</p>
                        </div>
                      )}
                      {selectedProduct.subCategory && (
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Sub-Category</h3>
                          <p className="text-gray-800 font-medium">{selectedProduct.subCategory.name}</p>
                        </div>
                      )}
                      {selectedProduct.size?.length > 0 && (
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Available Sizes</h3>
                          <div className="flex flex-wrap gap-1">
                            {selectedProduct.size.map((size) => (
                              <span
                                key={size}
                                className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {selectedProduct.description && (
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</h3>
                          <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                          />
                        </div>
                      )}
                  
                      {selectedProduct.specification && (
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Specification</h3>
                          <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{ __html: selectedProduct.specification }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => addToCart(selectedProduct._id)}
                      disabled={addingToCart[selectedProduct._id]}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        addingToCart[selectedProduct._id]
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {addingToCart[selectedProduct._id] ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} className="mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>

                    {selectedProduct.PDFbrochure && (
                      <>
                        <button
                          onClick={() => setIsViewingBrochure(true)}
                          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center"
                        >
                          <EyeIcon size={16} className="mr-2" />
                          View Brochure
                        </button>
                        <button
                          onClick={() => handleDownload(selectedProduct.PDFbrochure, `${selectedProduct.name}_brochure.pdf`)}
                          className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center"
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        changeStatus(selectedProduct._id , selectedProduct.homeVisibility);
                      }}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center ml-auto"
                    >
                      Toggle Visibility
                    </button>
                    <button
                      onClick={() => {
                        deleteP(selectedProduct._id);
                      }}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center ml-auto"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Product
                    </button>

                    <button
                      onClick={() => {
                        setEditingProduct(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                    >
                      Edit Product
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Edit Product</h2>
                <button onClick={() => setEditingProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  {/* <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editFormData.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditFormData({...editFormData, description: data});
                      }}
                    />
                  </div> */}

                       <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={editingProduct.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditFormData({...editingProduct, description: data});
                }}
                     config={{
                        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
                      }}
              />
</div>




                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editingProduct.specialization}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditFormData({...editingProduct, specialization: data});
                      }}
                      config={{
                        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
                      }}
                    />
                  </div>

{/* 
     <div className="col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF Brochure</label>
  <input
    type="file"
    accept="application/pdf"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setEditFormData({ ...editFormData, PDFbrochure: file });
      }
    }}
    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100
      cursor-pointer"
  />
</div> */}

 <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-primary-500">
            <div className="flex flex-col items-center space-y-2">
             
              <Upload className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-600">
                Drop files or{" "}
                <span className="text-primary-600 underline">browse</span>
              </span>
              <span className="text-xs text-gray-500">(Max 5 images)</span>
            </div>
            <input
              type="file"
              name="images"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleImageChange}
              className="hidden"
              disabled={imageFiles.length >= 5}
            />
          </label>

          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
            PDF Brochure
          </label>
          <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-primary-500">
            <div className="flex flex-col items-center space-y-2">
              <Upload className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-600">
                Drop files or{" "}
                <span className="text-primary-600 underline">PDF brochure</span>
              </span>
              <span className="text-xs text-gray-500">(PDF only)</span>
            </div>
            <img src={editingProduct.images[0]} alt="" />
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              multiple
              onChange={handlePDFChange}
              className="hidden"
              disabled={imageFilesPdf.length >= 1} // Limit to 1 PDF
            />
          </label>
        


                </div>

                <div className="flex gap-3">
                  <button
                  onClick={handleUpdate}
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;