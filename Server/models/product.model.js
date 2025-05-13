const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
    },
    specialization:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    },
    images: [
        {
            type: String
        }
    ],
    homeVisibility: { type: Boolean, default: true },
    PDFbrochure: [
        {
            type: String
        }
    ]
}, {
    timestamps: true,
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
