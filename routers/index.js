const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const UserController = require("../controllers/UserController")

router.get('/', Controller.showHomePage);

router.get('/register', UserController.showRegisterUser);
router.post('/register', UserController.postRegisterUser);

router.get('/register/profile', UserController.showRegisterProfile);
router.post('/register/profile', UserController.postRegisterProfile);

router.get('/login', UserController.showLoginForm)
router.post('/login', UserController.postLogin)

module.exports = router;