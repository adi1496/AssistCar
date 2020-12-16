import '@babel/polyfill';
import {homeModule} from './models/homeModule.js';
import {loginModule} from './models/loginModule.js';
import {signupModule} from './models/signupModule.js';
import {forgotPasswordModule} from './models/forgotResetPasswordModel.js';
import {resetPasswordModule} from './models/forgotResetPasswordModel.js';
import {overviewModule} from './models/overviewModule.js';
import {headerModel} from './models/headerModel.js';
import {accountSettingsModule} from './models/accountModule.js';

// utils
import {setActiveNavItem} from './utils/helpFunctions.js';
console.log(window);

switch(window.location.pathname) {
    case '/': {
        // headerModel();
        setActiveNavItem('home');
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
        setActiveNavItem('overview');
        headerModel();
        overviewModule();
        break;
    }

    case '/account-info': {
        setActiveNavItem('account-info');
        headerModel();
        accountSettingsModule();
        break;
    }

    default: {
        if(window.location.pathname.startsWith('/reset-password/')) {
            resetPasswordModule();
        }
        break;
    }

}