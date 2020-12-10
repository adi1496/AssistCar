const express = require('express');

const carsController = require('./../controllers/carsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
.get(authController.isLoggedIn, authController.restrictTo('admin'), carsController.getAllCars)
.post(authController.isLoggedIn, carsController.createNewCar);

router.route('/:id')
.get(authController.isLoggedIn, authController.restrictTo('admin'), carsController.getOneCar)
.patch(authController.isLoggedIn, authController.restrictTo('admin', 'leader'), carsController.updateCar)
.delete(authController.isLoggedIn, authController.restrictTo('admin'), carsController.deleteCar);

router.get('/find-my-car/:target', authController.isLoggedIn, carsController.findMyCar);
router.get('/get-popup/:target/:prop', authController.isLoggedIn, carsController.getCarPropPopup);
router.patch('/update-my-car/:target/:prop', authController.isLoggedIn, carsController.updateMyCar);

module.exports = router;