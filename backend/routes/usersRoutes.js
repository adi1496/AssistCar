const express = require('express');

const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.isLoggedIn, authController.logout);
router.post('/forgot-password', authController.forgotPassowrd);
router.post('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.isLoggedIn, authController.updatePassword);

module.exports = router;