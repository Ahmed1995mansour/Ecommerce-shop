const express = require('express');
const router = express.Router();

// Controllers
const { create, read } = require('../controllers/product');

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// routes

router.post('/product', authCheck, adminCheck, create);
router.get('/products', read);

module.exports = router;
