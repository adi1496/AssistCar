const Model = require('./../models/uerModel');
const Mail = require('./../utils/mail');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const helpFunctions = require('./../utils/helpFunctions');

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