"use client";

import { useState, useEffect } from "react";
import {
  addProduct,
  fetchcategory,
  fetchSubcategory,
  getProductsbyid,
  updateProducts,

} from "../api";
import { CheckCircle, Upload, X } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    specialization: "",
    category: "",
    subCategory: "",
    size: [],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);

  // Fetch product if in edit mode


  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await getProductsbyid(id);
          const data = res.data;

          console.log(data.category.name)
          setFormData({
            name: data?.name || "",
            description: data?.description || "",
            specialization: data?.specialization || "",
            category: data?.category?.name || "",
            subCategory: data?.subCategory?.name || "",
            size: data?.size || [],
          });
        } catch (error) {
          console.error("Error fetching product by ID:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchcategory();
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetchSubcategory();
        setSubCategories(res.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (formData.category) {
      const filtered = subCategories.filter(
        (subCat) => subCat.category === formData.category
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.category, subCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const maxFileSize = 10 * 1024 * 1024;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) =>
        ["image/jpeg", "image/png"].includes(file.type) && file.size <= maxFileSize
    );

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
      (file) => file.type === "application/pdf" && file.size <= maxFileSize
    );
    setPdfFiles(files);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "size") {
          productData.append(key, JSON.stringify(formData[key]));
        } else {
          productData.append(key, formData[key]);
        }
      });

      imageFiles.forEach((file) => {
        productData.append("images", file);
      });

      pdfFiles.forEach((file) => {
        productData.append("PDFbrochure", file);
      });

      if (id) {
        console.log(id, formData)
        await updateProducts(id, formData);
      } else {
        await addProduct(productData);
      }

      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        specialization: "",
        category: "",
        subCategory: "",
        size: [],
      });
      setImageFiles([]);
      setPdfFiles([]);
      setImagePreviews([]);

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-primary-600 text-white">
        <h2 className="text-xl font-bold">
          {id ? "Edit Product" : "Add New Product"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Category & SubCategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub-Category
            </label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              disabled={!formData.category}
            >
              <option value="">Select Sub-Category</option>
              {filteredSubCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="border border-gray-300 rounded-md p-2">
            <CKEditor
              editor={ClassicEditor}
              data={formData.description}
              onChange={(event, editor) =>
                setFormData((prev) => ({
                  ...prev,
                  description: editor.getData(),
                }))
              }
            />
          </div>
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specification
          </label>
          <div className="border border-gray-300 rounded-md p-2">
            <CKEditor
              editor={ClassicEditor}
              data={formData.specialization}
              onChange={(event, editor) =>
                setFormData((prev) => ({
                  ...prev,
                  specialization: editor.getData(),
                }))
              }
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md cursor-pointer">
            <div className="text-center">
              <Upload className="w-6 h-6 mx-auto text-gray-500" />
              <span className="text-sm text-gray-600">Upload Images</span>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleImageChange}
              className="hidden"
              disabled={imageFiles.length >= 5}
            />
          </label>

          {/* PDF */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            PDF Brochure
          </label>
          <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md cursor-pointer">
            <div className="text-center">
              <Upload className="w-6 h-6 mx-auto text-gray-500" />
              <span className="text-sm text-gray-600">Upload PDF</span>
            </div>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePDFChange}
              className="hidden"
              disabled={pdfFiles.length >= 1}
            />
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            {loading
              ? id
                ? "Updating..."
                : "Adding..."
              : id
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>

        {success && (
          <div className="flex items-center justify-center text-green-600 bg-green-50 p-3 rounded-md mt-2">
            <CheckCircle className="mr-2" size={18} />
            <span>
              {id ? "Product updated successfully!" : "Product added successfully!"}
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
