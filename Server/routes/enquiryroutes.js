const express = require('express');
const enquiryController = require('../controllers/enquiryCtrl');

const router = express.Router();

router.post('/display/:id', enquiryController.EnquiryProduct);
router.get('/alldisplay', enquiryController.EnquiryDisplayAll);
router.get('/getproducts/:id', enquiryController.EnquiryGetProduct);
router.delete('/alldelete/:id', enquiryController.EnquiryDelete);


module.exports = router;