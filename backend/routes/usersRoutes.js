const express = require('express');

const authController = require('./../controllers/authController');
const usersControler = require('./../controllers/usersControler');

const router = express.Router();
//Only from authController
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.isLoggedIn, authController.logout);
router.post('/forgot-password', authController.forgotPassowrd);
router.post('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.isLoggedIn, authController.updatePassword);
router.patch('/activate-account/:token', authController.activateAccount);

//userController
router.post('/create-my-driver', authController.isLoggedIn, authController.restrictTo('leader'), usersControler.createMyDriver);

module.exports = router;