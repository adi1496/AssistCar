//Core Modules
const fs = require('fs');

const replaceTempString = (fileName, file) => {
    let outFile;
    if(fileName === 'account-page.xml') {
        outFile = file.replace(/{%nav%}/g, 'navigation-account');
        outFile = outFile.replace(/{%legal%}/g, 'legal-account');
    }else if(fileName === 'login-page.xml' || fileName === 'signup-page.xml' || fileName === 'home-page.xml') {
        outFile = file.replace(/{%nav%}/g, 'navigation-log-sign');
        outFile = outFile.replace(/{%legal%}/g, 'legal-account');
    }

    if(outFile === undefined) return file;
    return outFile;
}

const getPage = (fileName, listeners) => {
    const file = fs.readFileSync(`${__dirname}/../public/html-pages/${fileName}`, 'utf-8');

    return {
        status: 'success',
        listeners,
        page: replaceTempString(fileName, file)
    }
}

exports.sendInitialPage = (req, res, next) => {
    // handle isUserLogged later in auth
    req.isUserLogged = true;

    if(req.params.page === 'overview' && req.isUserLogged === false) {
        res.status(200).json(getPage('home-page.xml', 'home'));
    }else if(req.params.page === 'signup' && req.isUserLogged === false){
        res.status(200).json(getPage('signup-page.xml', 'signup'));
    }else if(req.params.page === 'login' && req.isUserLogged === false){
        res.status(200).json(getPage('login-page.xml', 'login'));
    }else if(req.params.page === 'overview' && req.isUserLogged === true){
        res.status(200).json(getPage('overview-user-page.xml', 'overview-user'));
    }
    else if(req.params.page === 'account-info' && req.isUserLogged === true){
        res.status(200).json(getPage('account-page.xml', 'account'));
    }
}

exports.sendSubpage = (req, res, next) => {
    // console.log(req.params);

    if (req.params.subpage === 'edit-profile') {
        res.status(200).json(getPage('sub-pages/edit-profile.xml', 'edit-profile'));
    }else if(req.params.subpage === 'password-security') {
        res.status(200).json(getPage('sub-pages/password-security.xml', 'password-security'));
    }else if(req.params.subpage === 'choose-plan') {
        res.status(200).json(getPage('sub-pages/choose-plan.xml', 'choose-plan'));
    }else if(req.params.subpage === 'notifications') {
        res.status(200).json(getPage('sub-pages/notifications.xml', 'notifications'));
    }
}