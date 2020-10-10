const express = require('express');

const carsController = require('./../controllers/carsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
.get(authController.isLoggedIn, authController.restrictTo('admin'), carsController.getAllCars)
.post(authController.isLoggedIn, carsController.createNewCar);

router.route('/:id')
.get(authController.isLoggedIn, authController.restrictTo('admin'), carsController.getOneCar)
.patch(authController.isLoggedIn, authController.restrictTo('admin'), carsController.updateCar)
.delete(authController.isLoggedIn, authController.restrictTo('admin'), carsController.deleteCar);

module.exports = router;