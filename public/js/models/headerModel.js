import {showAlertMessages} from './../utils/helpFunctions.js';
import {getFetchRequests} from './../utils/fetchRequests.js';


export const headerModel = () => {
    // put in the object dom elements to be used later
    const domElements = {
        headerUser: document.querySelector('.header__user'),
        headerDropDown: document.querySelector('.header__drop-down'),
        logOutBtn: document.getElementById('logout'),
        headerNotifications: document.querySelector('.header__notification'),
        headerNotDrop: document.querySelector('.header__notification-drop')
    };

    /************ USER DROP-DOWN MENU ************/
    domElements.headerUser.addEventListener('click', event => {
        if(domElements.headerDropDown.classList.contains('header__drop-down--active')){
            domElements.headerDropDown.classList.remove('header__drop-down--active');
        }else {
            domElements.headerDropDown.classList.add('header__drop-down--active');
        }
    });


    /************ NOTIFICATIONS DROP-DOWN MENU ************/
    domElements.headerNotifications.addEventListener('click', event => {
        if(domElements.headerNotDrop.classList.contains('header__notification-drop--active')){
            domElements.headerNotDrop.classList.remove('header__notification-drop--active');
        }else {
            domElements.headerNotDrop.classList.add('header__notification-drop--active');
        }
    });


    /************ LOGOUT BUTTON ************/
    domElements.logOutBtn.addEventListener('click', async event => {
        event.preventDefault();
        domElements.headerDropDown.classList.remove('header__drop-down--active');

        const json = await getFetchRequests('api/v1/users/logout');

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages (json.status, json.message, 'body', 5, '');
        }else if(json.status === 'success') {
            showAlertMessages (json.status, json.message, 'body', 1.5, 'reload');
        }
    });

}