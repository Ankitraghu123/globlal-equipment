// const mongoose = require('mongoose');

// const enquirySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     trim: true,
//     lowercase: true,
//     validate: {
//       validator: function(v) {
//         return /^\S+@\S+\.\S+$/.test(v);
//       },
//       message: props => `${props.value} is not a valid email address!`
//     }
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     validate: {
//       validator: function(v) {
//         return /^[\d\s+-]{10,}$/.test(v);
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     }
//   },
//   subject: {
//     type: String,
//     enum: ['', 'Product Inquiry', 'Pricing', 'Technical Support', 'Other'],
//     default: ''
//   },
//   message: {
//     type: String,
//     required: [true, 'Message is required'],
//     trim: true
//   },
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   },
  
// });


// const Enquiry = mongoose.model('Enquiry', enquirySchema);

// module.exports = Enquiry;


const mongoose = require('mongoose');


const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    
  },
  subject: {
    type: String,
    enum: ['', 'Product Inquiry', 'Pricing', 'Technical Support', 'Other'],
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }, 

  productName:{
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },

  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved'],
    default: 'new'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
},
{
  date : true,
  
}

)


const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;