const express = require('express');
const { productList } = require('../controllers/getDateController');

const router = express.Router();

router.get('/list',productList);

module.exports = router;