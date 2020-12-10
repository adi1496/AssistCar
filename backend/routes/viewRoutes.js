const express = require('express');

const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.viewisLoggedIn, viewController.sendHomePage);
router.get('/login', authController.viewisLoggedIn, viewController.sendLoginPage);
router.get('/signup', authController.viewisLoggedIn, viewController.sendSignupPage);
router.get('/forgot-password', authController.viewisLoggedIn, viewController.sendForgotPasswordPage);
router.get('/reset-password', authController.viewisLoggedIn, viewController.sendResetPassword);

router.get('/overview', authController.viewisLoggedIn, viewController.sendOverviewPage);
// router.get('/overview/:target', authController.viewisLoggedIn, viewController.sendOverviewPage);
router.get('/account-info', authController.viewisLoggedIn, viewController.sendAccountPage);

router.get('/car-documents', authController.viewisLoggedIn, viewController.sendCarDocumentsPage);
router.get('/assistance', authController.viewisLoggedIn, viewController.sendAssistancePage);


router.get('/subpage/:subpage', authController.viewisLoggedIn, viewController.sendSubPage);

module.exports = router;