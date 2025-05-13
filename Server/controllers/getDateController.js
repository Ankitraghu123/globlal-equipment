const Cart = require('../models/cart.model');
const Product = require('../models/product.model');




const productList = async (req, res) => {
    try {
        const cart = await Product.find().populate("category").populate("subCategory");

        if (!cart) {
            return res.status(400).json({ message: "All product" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { productList };