// import '@babel/polyfill';
import {homeModule} from './models/homeModule.js';
import {loginModule} from './models/loginModule.js';
import {signupModule} from './models/signupModule.js';
import {forgotPasswordModule} from './models/forgotResetPasswordModel.js';
import {overviewModule} from './models/overviewModule.js';
import {headerModel} from './models/headerModel.js';
import {accountSettingsModule} from './models/accountModule.js';

console.log(window);

switch(window.location.pathname) {
    case '/': {
        // headerModel();
        homeModule();
        break;
    }

    case '/login': {
        loginModule();
        break;
    }

    case '/signup': {
        signupModule();
        break;
    }

    case '/forgot-password': {
        forgotPasswordModule();
        break;
    }

    case '/overview': {
        headerModel();
        overviewModule();
        break;
    }

    case '/account-info': {
        headerModel();
        accountSettingsModule();
        break;
    }

}