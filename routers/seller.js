const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.showSellerPage);
router.get('/add/', Controller.showAddProductForm);
router.post('/add/', Controller.addNewProduct);
router.get('/edit/:id', Controller.showEditProductForm);
router.post('/edit/:id', Controller.editProduct);
router.get('/delete/:id', Controller.deleteProduct);

module.exports = router;