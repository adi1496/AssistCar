import {homeLoad} from './../models/homeModule.js';
import {overviewUserLoad} from './../models/overviewUserModule.js';
import {accountSettingsLoad, loadEditProfile} from './../models/accountSettingsModule.js';
import {loginLoad, signupLoad} from './../models/loginModule.js';
import {loadHeaderUserLogged} from './../models/header.js';

/*************** MAIN FUNCTION FOR LISTENERS ****************/
export const loadJS = (url, listeners) => {
    try{
        if(url === 'overview' && listeners === 'overview-user') {
            loadHeaderUserLogged();
            overviewUserLoad();
        }else if(url ==='account-info' && listeners === 'account') {
            loadHeaderUserLogged();
            accountSettingsLoad();
            loadEditProfile();
        }else if(url === 'home' && listeners === 'home'){
            homeLoad();
        }else if(url === 'login' && listeners === 'login'){
            loginLoad();
        }else if(url === 'signup' && listeners === 'signup'){
            signupLoad();
        }
    } catch(err) {
        console.log(err);
        setTimeout(() => {
            loadJS(url);
        }, 500);
    }

}