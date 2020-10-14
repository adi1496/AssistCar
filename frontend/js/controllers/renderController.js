import {renderPage, showloadingPage, hideLoadingPage} from './../views/renderPage.js';
import {renderOverviewDetails, setSelectCarDropDownElements} from './../views/overviewViews.js';
import {getFetchRequests} from './../utils/fetchRequests.js';

import {homeLoad} from './../models/homeModule.js';
import {overviewUserLoad} from './../models/overviewUserModule.js';
import {accountSettingsLoad, loadEditProfile} from './../models/accountSettingsModule.js';
import {loginLoad, signupLoad} from './../models/loginModule.js';
import {loadHeaderUserLogged} from './../models/headerModel.js';

/******* Load pages sent by the server **********/
const loadJS = json => {
    console.log('Hey');
    try{
        if(json.listeners === 'overview-user') {
            renderOverviewDetails(json.cars);
            setSelectCarDropDownElements(json.cars);
            setTimeout(() => {
                loadHeaderUserLogged();
                overviewUserLoad();
            }, 500)
            
        }else if(json.listeners ==='account') {
            loadHeaderUserLogged();
            accountSettingsLoad();
            loadEditProfile();
        }else if(json.listeners === 'home'){
            homeLoad();
        }else if(json.listeners === 'login'){
            loginLoad();
        }else if(json.listeners === 'signup'){
            signupLoad();
        }else if(json.listeners ==='car-documents') {
            loadHeaderUserLogged();
        }else if(json.listeners ==='assistance') {
            loadHeaderUserLogged();
        }

    } catch(err) {
        console.log(err);
        setTimeout(() => {
            // loadJS(json);
        }, 500);
    }

}


const redirectDependingLoginState = (status, page) => {
    if(status === 'notLogged') {
        window.location.href = page;
    }else if(status === 'logged'){
        window.location.href = page;
    }
}

/******* Controller **********/
export const renderController = async(pageRequest) => {
    console.log(pageRequest);
    const json = await getFetchRequests(`api/v1/pages/${pageRequest}`)

    //redirect to another page if user is logged or not. Dipends of page request
    redirectDependingLoginState(json.status, json.page);

    if(document.readyState === 'complete' || document.readyState === 'interactive') {
        renderPage('.container', json.page);
        // console.log(json);
        setTimeout(() => {
            loadJS(json);
        }, 300);

        hideLoadingPage();
    }
}
