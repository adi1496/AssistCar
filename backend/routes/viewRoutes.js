const express = require('express');

const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/home', viewController.sendHomePage);
router.get('/login', authController.viewisLoggedIn, viewController.sendLoginPage);
router.get('/signup', authController.viewisLoggedIn, viewController.sendSignupPage);
router.get('/overview', authController.viewisLoggedIn, viewController.sendOverviewPage);
router.get('/account-info', authController.viewisLoggedIn, viewController.sendAccountPage);

router.get('/subpage/:subpage', authController.viewisLoggedIn, viewController.sendSubpage);

module.exports = router;