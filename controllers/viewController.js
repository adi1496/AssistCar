//Core Modules
const fs = require('fs');

const User = require('./../models/uerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const helpFunctions = require('./../utils/helpFunctions');
const createOverview = require('./../utils/createOverview');
const accountSubpages = require('./../utils/accountSubpages');
// const { signUp } = require('./authController');

const getPage = fileName => {
    const file = fs.readFileSync(`${__dirname}/../views/html/${fileName}`, 'utf-8');
    if(!file) return next(new AppError('Page not found. Please try again', 404));
    return file;
}

const changeNavigationClass = (file, navClass, legalClass) => {
    let outFile = file.replace(/{%nav%}/g, navClass);
    outFile = outFile.replace(/{%legal%}/g, legalClass);
    return outFile;
}

const setImageAndNameHeader = (file, user) => {
    if(user.photo) {
        file = file.replace('{%user-image%}', `/img/user-img/${user.photo}`);
    }else {
        file = file.replace('{%user-image%}', `/img/user-img/user.jpg`);
    }
    file = file.replace('{%userName%}', user.firstName);

    return file;
}

const creteIndexHTML = (index, page, header, navigation, gallery) => {
    page = page.replace('{%header%}', header);
    page = page.replace('{%navigation-menu%}', navigation);

    if(gallery) page = page.replace('{%gallery%}', gallery);

    index = index.replace('{%container-content%}', page);
    return index;
}

exports.sendSubPage = (req, res, next) => {
    // console.log(req.params);
    const user = req.user;
    if(req.isLoggedIn){
        if (req.params.subpage === 'edit-profile') {
            let file = getPage('sub-pages/edit-profile.xml');
            file = accountSubpages.createEditProfile(file, user)

            res.status(200).json({
                status: 'success',
                file
            });

        }else if(req.params.subpage === 'password-security') {
            const file = getPage('sub-pages/password-security.xml');

            res.status(200).json({
                status: 'success',
                file
            });

        }else if(req.params.subpage === 'choose-plan') {
            const file = getPage('sub-pages/choose-plan.xml');
            
            res.status(200).json({
                status: 'success',
                file
            });

        }else if(req.params.subpage === 'notifications') {
            const file = getPage('sub-pages/notifications.xml');
            
            res.status(200).json({
                status: 'success',
                file
            });
        }
    }

    
}

exports.sendOverviewPage = catchAsync(async(req, res, next) => {
    if(req.isLoggedIn) {
        let index = getPage('index.html');
        let header = getPage('components/header-logged.xml');
        let navigation = getPage('components/navigation-logged.xml');
        const gallery = getPage('components/gallery.xml');
        let overviewBar = getPage('components/overviewBar.xml');
        let overview = getPage('overview-user-page.xml');

        const user = await User.findById(req.user._id).populate('cars');
        if(!user) return next(new AppError('There was a problem, please try again', 500));
        
        
        header = setImageAndNameHeader(header, user);
        navigation = changeNavigationClass(navigation, 'navigation', 'legal');

        let car;
        if(req.params.target){
            user.cars.forEach( el => {
                if(req.params.target === el.registerNo) car = el;
            });
        }else {
            car = user.cars[0];
        }

        overviewBar = createOverview.createOverviewBar(overviewBar, user.cars, car);
        overview = overview.replace('{%overviewBar%}', overviewBar);

        let detailsList = createOverview.createOverviewDetails(car);

        overview = overview.replace('{%details-list%}', detailsList);

        index = creteIndexHTML(index, overview, header, navigation, gallery);
    
        res.status(200).send(index);
    }else {
        res.redirect('/login');
    }
});

exports.sendAccountPage = (req, res, next) => {
    const user = req.user;
    if(req.isLoggedIn === true){
        let index = getPage('index.html');
        let header = getPage('components/header-logged.xml');
        let navigation = getPage('components/navigation-logged.xml');
        const gallery = getPage('components/gallery.xml');
        let account = getPage('account-page.xml');

        header = setImageAndNameHeader(header, user);
        navigation = changeNavigationClass(navigation, 'navigation-account', 'legal-account');

        account = accountSubpages.createEditProfile(account, user);

        index = creteIndexHTML(index, account, header, navigation, gallery);

        res.status(200).send(index);
    }else {
        res.redirect('/login');
    }
    
}

exports.sendCarDocumentsPage = (req, res, next) => {
    const user = req.user;
    if(req.isLoggedIn === true){
        let index = getPage('index.html');
        let header = getPage('components/header-logged.xml');
        let navigation = getPage('components/navigation-logged.xml');
        const documents = getPage('documents-page.xml');

        header = setImageAndNameHeader(header, user);
        navigation = changeNavigationClass(navigation, 'navigation', 'legal');
        
        index = creteIndexHTML(index, documents, header, navigation);

        res.status(200).send(index);
    }else {
        res.redirect('/login');
    }
    
}

exports.sendAssistancePage = (req, res, next) => {
    let index = getPage('index.html');
    const assistencePage = getPage('assistance-page.xml');
    
    let header, navigation;
    if(req.isLoggedIn){
        const user = req.user;
        header = getPage('components/header-logged.xml');
        navigation = getPage('components/navigation-logged.xml');
        header = setImageAndNameHeader(header, user);
    }else{
        header = getPage('components/header.xml');
        navigation = getPage('components/navigation.xml');
    }

        navigation = changeNavigationClass(navigation, 'navigation', 'legal');

        index = creteIndexHTML(index, assistencePage, header, navigation);

        res.status(200).send(index);
}

exports.sendHomePage = (req, res, next) => {
    let navigation, header;
    if(req.isLoggedIn){
        header = getPage('components/header-logged.xml');
        navigation = getPage('components/navigation-logged.xml');

        header = setImageAndNameHeader(header, req.user);
    }else {
        header = getPage('components/header.xml');
        navigation = getPage('components/navigation.xml');
    }
    let index = getPage('index.html');
    const gallery = getPage('components/gallery.xml');
    let home = getPage('home-page.xml');
    
    navigation = changeNavigationClass(navigation, 'navigation-log-sign', 'legal-account');

    home = home.replace('{%user-1%}', `img/user-1.jpg`);
    home = home.replace('{%user-2%}', `img/user-2.jpg`);

    index = creteIndexHTML(index, home, header, navigation, gallery);

    res.status(200).send(index);
    
}

exports.sendSignupPage = (req, res, next) => {
    if(req.isLoggedIn === false){
        let index = getPage('index.html');
        const header = getPage('components/header.xml');
        let navigation = getPage('components/navigation.xml');
        let signup = getPage('signup-page.xml');

        navigation = changeNavigationClass(navigation, 'navigation-log-sign', 'legal-account');

        index = creteIndexHTML(index, signup, header, navigation);
    
        res.status(200).send(index);
    }else {
        res.redirect('/overview');
    }
    
}

exports.sendLoginPage = (req, res, next) => {
    if(req.isLoggedIn === false){
        let index = getPage('index.html');
        const header = getPage('components/header.xml');
        let navigation = getPage('components/navigation.xml');
        let login = getPage('login-page.xml');

        navigation = changeNavigationClass(navigation, 'navigation-log-sign', 'legal-account');

        index = creteIndexHTML(index, login, header, navigation);

        res.status(200).send(index);
    }else {
        res.redirect('/overview');
    }
    
}

exports.sendForgotPasswordPage = (req, res, next) => {
    if(req.isLoggedIn === false){
        let index = getPage('index.html');
        const header = getPage('components/header.xml');
        let navigation = getPage('components/navigation.xml');
        let forgotPassword = getPage('forgotPassword-page.xml');

        navigation = changeNavigationClass(navigation, 'navigation-log-sign', 'legal-account');

        index = creteIndexHTML(index, forgotPassword, header, navigation);

        res.status(200).send(index);
    }else {
        res.redirect('/overview');
    }
}

exports.sendResetPassword = (req, res, next) => {
    if(req.isLoggedIn === false){
        let index = getPage('index.html');
        const header = getPage('components/header.xml');
        let navigation = getPage('components/navigation.xml');
        let resetPassword = getPage('resetPassword-page.xml');

        navigation = changeNavigationClass(navigation, 'navigation-log-sign', 'legal-account');

        index = creteIndexHTML(index, resetPassword, header, navigation);
        index = index.replace('{%token%}', req.params.token);

        res.status(200).send(index);
    }else {
        res.redirect('/overview');
    }
}