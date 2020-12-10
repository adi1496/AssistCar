const express = require('express');

const authController = require('./../controllers/authController');
const usersControler = require('./../controllers/usersControler');

const router = express.Router();
//Only from authController
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.isLoggedIn, authController.logout);
router.post('/forgot-password', authController.forgotPassowrd);
// router.post('/reset-password', authController.forgotPassowrd);
router.post('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.isLoggedIn, authController.updatePassword);


//userController
router.patch('/update-me', authController.isLoggedIn, usersControler.updateMe);
router.post('/upload-my-photo', authController.isLoggedIn, usersControler.uploadMyPhoto);
router.patch('/activate-account/:token', authController.activateAccount);

router.post('/create-my-driver', authController.isLoggedIn, authController.restrictTo('leader'), usersControler.createMyDriver);
router.patch('/update-car-drivers', authController.isLoggedIn, authController.restrictTo('leader'), usersControler.updateCarDrivers);

module.exports = router;