const multer = require('multer');
const path = require('path');

const Model = require('./../models/uerModel');
const Car = require('./../models/carModel');
const Mail = require('./../utils/mail');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const helpFunctions = require('./../utils/helpFunctions');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../public/img/user-img/`);
    },
    filename: function (req, file, cb) {
        cb(null, req.user.firstName.toLowerCase() + '-' + Date.now() + '.jpg');
    }
});

let upload = multer({storage: storage}).single('file');


exports.updateMe = catchAsync(async(req, res, next) => {
    const body = helpFunctions.sortBody(req.body);

    const user = await Model.findByIdAndUpdate(req.user._id, body);

    if(!user) return next('There was a problem. Please try again', 401);

    res.status(200).json({
        status: 'success',
        message: 'Your profile was update successfully'
    });
});

exports.uploadMyPhoto = catchAsync(async(req, res, next) => {
    await upload(req, res, async function(err) {
        if(err){
            // console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Error uploading the file'
            });
        }
        const user = req.user;

        user.photo = req.file.filename;
        await user.save({validateBeforeSave: false});

        res.status(200).json({
            status: 'success',
            message: 'File Uploaded',
            photo: `http://${req.hostname}:${process.env.PORT}/public/img/user-img/${user.photo}`
        });
    })
});

exports.createMyDriver = catchAsync(async(req, res, next) => {
    const user = await Model.findById(req.user._id).select('-active -lastName');

    if(!user) next(new AppError('You are not logged in. Please login', 401));

    const token = helpFunctions.createActivateAccountToken();

    const newDriver =  await Model.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userRole: 'driver',
        active: false,
        password: 'temporaryPass',
        confirmPassword: 'temporaryPass',
        activateAccount: token.activateAccount
    });

    if(!newDriver) next(new AppError(`Driver's account was not created, please try again!`, 400));

    user.drivers.push(newDriver._id);

    await user.save({validateBeforeSave: false});

    const message = `Hello ${newDriver.firstName}, ${user.firstName} just added you in his company account on AssistCar. Please check your e-mail account, activate your account and set your new password. Click the link below: \n${req.hostname}:${process.env.PORT}/api/v1/users/activate-account/${token.randomStr}`;
    const subject = "Your account activation link";

    const email = new Mail(subject, message, newDriver.email);
    email.createTransporter();
    await email.send();

    res.status(201).json({
        status: 'success',
        newDriver
    });

});

exports.updateCarDrivers = catchAsync(async(req, res, next) => {
    const action = req.body.action;

    if(!action) next(new AppError('Bad request, please try again', 400));
    const email = req.body.email;
    const registerNo = req.body.registerNo.toUpperCase();
    if(!req.body.email) next(new AppError('Please provide the email of the driver,', 400));
    if(!req.body.registerNo) next(new AppError('Please provide the register no of the car', 400));

    const user = await Model.findOne({email});
    if(!user) next(new AppError('Not user registered with this email', 404));

    const car = await Car.findOne({registerNo});
    if(!car) next(new AppError('There is no car with this register number', 404));

    switch(action) {
        case 'add': {
            //add a driver to a car
            
            // addDriverToCar(res, next, req.body.email, req.body.registerNo);
            car.company.drivers.push(user._id);
            car.save({validateBeforeSave: false});

            res.status(200).json({
                status: 'success',
                message: `Drivers list was successfully updated for car: ${car.registerNo}`
            })
            break;
        }

        case 'remove': {
            //remove driver from a car
            let drivers = [];
            car.company.drivers.forEach( el => {
                if(el.toString() !== user._id.toString()) drivers.push(el);
            });

            console.log(user._id);
            console.log(drivers);
            car.company.drivers = drivers;
            await car.save({validateBeforeSave: false});

            res.status(200).json({
                status: 'success',
                message: `Driver ${user.firstName} was successfully removed from car list: ${car.registerNo}`
            })

            break;
        }

        default: {
            next(new AppError('This action is not available', 400));
        }
    }
});