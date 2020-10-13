//Core Modules
const fs = require('fs');
const User = require('./../models/uerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const helpFunctions = require('./../utils/helpFunctions');

const getPage = fileName => {
    return fs.readFileSync(`${__dirname}/../public/html-pages/${fileName}`, 'utf-8');;
}

exports.sendSubpage = (req, res, next) => {
    // console.log(req.params);
    const user = req.user;
    if(req.isLoggedIn){
        if (req.params.subpage === 'edit-profile') {
            const file = getPage('sub-pages/edit-profile.xml');
            let outFile;
            if(user.photo) {
                outFile = file.replace('{%user-image%}', `http://${req.hostname}:${process.env.PORT}/img/user-img/${user.photo}`);
            }else {
                outFile = file.replace('{%user-image%}', `http://${req.hostname}:${process.env.PORT}/img/user-img/user.jpg`);
            }

            outFile = helpFunctions.setAccountDetails(outFile, user);

            console.log(outFile);
            res.status(200).json({
                status: 'success',
                listeners: 'edit-profile',
                page: outFile
            });
        }else if(req.params.subpage === 'password-security') {
            const file = getPage('sub-pages/password-security.xml');
            res.status(200).json({
                status: 'success',
                listeners: 'password-security',
                page: file
            });
        }else if(req.params.subpage === 'choose-plan') {
            const file = getPage('sub-pages/choose-plan.xml');
            res.status(200).json({
                status: 'success',
                listeners: 'choose-plan',
                page: file
            });
        }else if(req.params.subpage === 'notifications') {
            const file = getPage('sub-pages/notifications.xml');
            res.status(200).json({
                status: 'success',
                listeners: 'notifications',
                page: file
            });
        }
    }

    
}

exports.sendOverviewPage = catchAsync(async(req, res, next) => {
    // console.log(req.isLoggedIn);
    if(req.isLoggedIn) {
        const user = await User.findById(req.user._id).populate('cars');
        const file = getPage('overview-user-page.xml');
        console.log(user);
        let outFile
    
        console.log(req.hostname);
        if(user.photo) {
            outFile = file.replace('{%user-image%}', `http://${req.hostname}:${process.env.PORT}/img/user-img/${user.photo}`);
        }else {
            outFile = file.replace('{%user-image%}', `http://${req.hostname}:${process.env.PORT}/img/user-img/user.jpg`);
        }
        outFile = outFile.replace('{%userName%}', user.firstName);

        if(user.cars[0]){
            outFile = outFile.replace('{%car-name%}', `${user.cars[0].brand} ${user.cars[0].model}`);
            outFile = outFile.replace('{%registerNo%}', user.cars[0].registerNo);
            outFile = outFile.replace('{%vin%}', user.cars[0].vin);
        }else {
            outFile = outFile.replace('{%car-name%}', `No Car Registered`);
            outFile = outFile.replace('{%registerNo%}', '');
            outFile = outFile.replace('{%vin%}', '');
        }
        

        let userInfo = {};
        if(user.company.isCompany === true){
            userInfo.isCompany = true;
            userInfo.company = user.company.comapnyName;
            userInfo.drivers = user.drivers;
        }
    
        res.status(200).json({
            status: 'success',
            listeners: 'overview-user',
            page: outFile,
            cars: user.cars
        });
    }else {
        res.status(401).json({
            status: 'notLogged',
            page: '#login'
        });
    }
});

exports.sendAccountPage = (req, res, next) => {
    // getPage('account-page.xml', 'account')
    const user = req.user;
    if(req.isLoggedIn === true){
        const file = getPage('account-page.xml');

        let outFile = file.replace(/{%nav%}/g, 'navigation-account');
        outFile = outFile.replace(/{%legal%}/g, 'legal-account');
        if(user.photo) {
            outFile = outFile.replace(/{%user-image%}/g, `http://${req.hostname}:${process.env.PORT}/img/user-img/${user.photo}`);
        }else {
            outFile = outFile.replace(/{%user-image%}/g, `http://${req.hostname}:${process.env.PORT}/img/user-img/user.jpg`);
        }
        outFile = outFile.replace('{%userName%}', user.firstName);

        outFile = helpFunctions.setAccountDetails(outFile, user);

        res.status(200).json({
            status: 'success',
            listeners: 'account',
            page: outFile
        });
    }else {
        res.status(401).json({
            status: 'notLogged',
            page: '#login'
        });
    }
    
}

exports.sendHomePage = (req, res, next) => {
    // getPage('home-page.xml', 'home')
    const file = getPage('home-page.xml');

    let outFile = file.replace(/{%nav%}/g, 'navigation-log-sign');
    outFile = outFile.replace(/{%legal%}/g, 'legal-account');
    outFile = outFile.replace('{%user-1%}', `http://${req.hostname}:${process.env.PORT}/img/user-1.jpg`);
    outFile = outFile.replace('{%user-2%}', `http://${req.hostname}:${process.env.PORT}/img/user-2.jpg`);

    console.log(outFile);

    res.status(200).json({
        status: 'success',
        listeners: 'home',
        page: outFile
    });
}

exports.sendSignupPage = (req, res, next) => {
    // getPage('signup-page.xml', 'signup')
    if(req.isLoggedIn === false){
        const file = getPage('signup-page.xml');

        let outFile = file.replace(/{%nav%}/g, 'navigation-log-sign');
        outFile = outFile.replace(/{%legal%}/g, 'legal-account');
    
        res.status(200).json({
            status: 'success',
            listeners: 'signup',
            page: outFile
        });
    }else {
        res.status(401).json({
            status: 'logged',
            page: '#overview'
        });
    }
    
}

exports.sendLoginPage = (req, res, next) => {
    // getPage('login-page.xml', 'login')
    if(req.isLoggedIn === false){
        const file = getPage('login-page.xml');

        let outFile = file.replace(/{%nav%}/g, 'navigation-log-sign');
        outFile = outFile.replace(/{%legal%}/g, 'legal-account');
    
        res.status(200).json({
            status: 'success',
            listeners: 'login',
            page: outFile
        });
    }else {
        res.status(401).json({
            status: 'logged',
            page: '#overview'
        });
    }
    
}