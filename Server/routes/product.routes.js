const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");

// POST route with proper middleware
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getproducthome,
  getAllProductsEcom,
} = require("../controllers/product.controller");



router.get("/", getAllProducts);
router.get("/allproduct", getAllProductsEcom);




router.get("/:id", getProductById);

// Only upload PDFbrochure via multer
router.post("/", upload, createProduct);

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.put("/:id/home-visibility", getproducthome);










module.exports = router;
