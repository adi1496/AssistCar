const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Model = require('./../models/uerModel');
const Mail = require('./../utils/mail');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const createJWT = (data) => {
    const token = jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    
    return token;
}

const verifyJWT = token => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
}

exports.signUp = catchAsync(async(req, res, next) => {
    const newUser = await Model.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    if(!newUser) return next(new AppError('User was not created, please try again', 400));

    newUser.password = undefined;

    res.status(200).json({
        status: 'success',
        newUser
    });
});

exports.login = catchAsync(async(req, res, next) => {
    const user = await Model.findOne({email: req.body.email}).select('+password');

    if(!user) next(new AppError('Email or password is incorrect. Please try again', 401));

    let checkPassword = await user.comparePaswwords(user.password, req.body.password);
    // console.log(checkPassword);
    if(checkPassword === false) next(new AppError('Email or password is incorrect. Please try again', 401));


    let token;
    if(checkPassword) {
        token = createJWT(user._id);
    }

    res.status(200).json({
        status: 'success',
        token
    })
});

exports.logout = catchAsync(async(req, res, next) => {
    const token = jwt.sign({data: 'fsaf'}, 'loggedout', {expiresIn: 1 * 1000});

    res.status(200).json({
        status: 'success',
        message: "You are logged out"
    })
});

exports.isLoggedIn = catchAsync(async(req, res, next) => {
    if(!req.headers.jwt) next(new AppError('You are not logged-in. Please log-in again to gain access', 401));

    const decoded = verifyJWT(req.headers.jwt);
    const user = await Model.findOne({_id: decoded.data}).select('+passwordChangedAt');

    if(!user) next(new AppError('You are not logged in. Please login to gain access', 401));
    
    if(user.changedPasswordAfter(decoded.iat)) next(new AppError('The password was recently changed. Please login again!', 401));

    //put user in the req if we need it later
    req.user = user;
    next();
});

exports.restrictTo = (...roles) => {
    return catchAsync(async(req, res, next) => {
        let ok = false;
        roles.forEach(el => {
            if(req.user.userRole === el) ok = true;
        });

        if(ok === false) next(new AppError(`You don't have rights to access this`, 401));

        next();
    });
}

exports.forgotPassowrd = catchAsync(async(req, res, next) => {
    if(!req.body.email) next(new AppError('Please provide an email', 400));

    const user = await Model.findOne({email: req.body.email});

    if(!user) next(new AppError('This is no account for this email. Please provide an valid email', 400));

    const resetToken = await user.createPasswordResetToken();

    await user.save({validateBeforeSave: false});

    let message = `Hello ${user.firstName}. Seems that you forgot your account password. If you would like to change the password, please access this link: \n${req.hostname}:${process.env.PORT}/api/v1/resetPassword/${resetToken}`;
    let subject = 'Password reset token. Valid for only 10 minutes';

    const mail = new Mail(subject, message, user.email);
    mail.createTransporter();
    await mail.send();

    res.status(200).json({
        status: 'success',
        resetToken
    })
});

exports.resetPassword = catchAsync(async(req, res, next) => {
    if(!req.params.token) next(new AppError('Your reset token is invalid', 401));

    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await Model.findOne({passwordResetToken: token});
    
    if(!user) next(new AppError('Your reset token is invalid', 401));

    if(user.passwordResetTokenExpires < Date.now()) next(new AppError('The token has expired. Please go an press again forgot password and wait for e-mail', 400));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Your password has been changed. you can now login'
    })
});

exports.updatePassword = catchAsync(async(req, res, next) => {
    const user = await Model.findById(req.user._id).select('+password');
    
    if(!user) next(new AppError('You are not logged in. Please login again', 401));

    const answer = await user.comparePaswwords(user.password, req.body.oldPassword);
    if(answer === false) next(new AppError('The old password is wrong. Please try again'));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Your password has been changed'
    })
});