const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const UserController = require("../controllers/UserController")
const isLoggedIn = require("../middlewares");

router.get('/', Controller.showHomePage);
router.post('/', isLoggedIn, Controller.addToCart);

router.use('/seller', require('./seller'));
router.get('/cart', Controller.showCartPage);
router.post('/purchase', Controller.purchase)
router.get('/purchaseHistory', Controller.showPurchaseHistory);

router.get('/register', UserController.showRegisterUser);
router.post('/register', UserController.postRegisterUser);

router.get('/register/profile', UserController.showRegisterProfile);
router.post('/register/profile', UserController.postRegisterProfile);

router.get('/login', UserController.showLoginForm);
router.post('/login', UserController.postLogin);
router.get('/logout', UserController.logOutUser);

module.exports = router;