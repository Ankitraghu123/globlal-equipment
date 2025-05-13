const fs = require('fs');
const path = require('path');
const imagekit = require('../config/imagekit');
const Product = require('../models/product.model');

const createProduct = async (req, res) => {
  try {
    // --- IMAGES via ImageKit ---
    const uploadedImages = [];
    for (const file of req.files.images || []) {
      const { url } = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: '/products'
      });
      uploadedImages.push(url);
    }

    // --- PDF: write to disk yourself ---
    let pdfUrl = '';
    if (req.files.PDFbrochure && req.files.PDFbrochure[0]) {
      const pdfFile = req.files.PDFbrochure[0];
      const filename = `${Date.now()}-${pdfFile.originalname}`;
      const savePath = path.join(__dirname, '..', 'uploads', 'pdfs', filename);
      fs.writeFileSync(savePath, pdfFile.buffer);
      pdfUrl = `${req.protocol}://${req.get('host')}/uploads/pdfs/${filename}`;
    }

    // --- Build and save Product ---
    const product = new Product({
      ...req.body,
      images: uploadedImages,
      PDFbrochure: pdfUrl,
      size: req.body.size ? JSON.parse(req.body.size) : []
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("subCategory");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllProductsEcom = async (req, res) => {
  try {
    const products = await Product.find({ homeVisibility: true })
      .populate("category")
      .populate("subCategory");
      
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category").populate("subCategory");
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
// const updateProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       specialization,
//       category,
//       subCategory,
//       images,
//       PDFbrochure
//     } = req.body;

//     const uploadedImages = [];

//     const files = Array.isArray(req.files?.images)
//       ? req.files.images
//       : req.files?.images
//       ? [req.files.images]
//       : [];

//     for (let file of files) {
//       const buffer = file.data;
//       const uploadResponse = await imagekit.upload({
//         file: buffer,
//         fileName: file.name,
//       });
//       uploadedImages.push(uploadResponse.url);
//     }

//     const updatedFields = {
//       name,
//       description,
//       specialization,
//       category,
//       subCategory,
//       images,
//       PDFbrochure
//     };

//     if (uploadedImages.length > 0) {
//       updatedFields.images = uploadedImages;
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       updatedFields,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const products = await Product.find();
    res.status(200).json({ message: 'Product deleted successfully', data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProduct = async (req, res) => {
  console.log(req.body, "REQ")
  try {
    const {
      name,
      description,
      specialization,
      category,
      subCategory,
      images,
      PDFbrochure
    } = req.body;


    const uploadedImages = [];

    // Handle images upload
    const files = Array.isArray(req?.files?.images)
      ? req.files.images
      : req.files?.images
      ? [req.files.images]
      : [];

    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }

    // Prepare updated fields
    const updatedFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(specialization && { specialization }),
      ...(category && { category }),
      ...(subCategory && { subCategory }),
      ...(PDFbrochure && { PDFbrochure }),
    };

    // Overwrite images only if new ones are uploaded
    if (uploadedImages.length > 0) {
      updatedFields.images = uploadedImages;
    } else if (images) {
      // If images (string URLs) sent via body, allow updating them too
      updatedFields.images = images;
    }

    console.log(updatedFields, "UUUUU")

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};


const getproducthome = async (req, res) => {
  const { homeVisibility } = req.body;

  // Create a new variable to toggle
  const newHomeVisibility = homeVisibility;

  try {
    console.log(homeVisibility,"sdafsa")
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { homeVisibility: homeVisibility },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating home visibility' });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getproducthome,
  getAllProductsEcom
};
