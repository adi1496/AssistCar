// import {renderPage} from './views/renderPage.js';

/*************** REMOVE ALL ACTIVE CLASSES FROM PROFILE NAVIGATION ****************/
const removeActiveClassProfileNav = (profileNavBtns, profileArrowIcons, class1, class2) => {
    profileNavBtns.forEach( el => {
        if(el.classList.contains(class1)) {
            el.classList.remove(class1);
        }
    });

    profileArrowIcons.forEach( el => {
        if(el.classList.contains(class2)) {
            el.classList.remove(class2);
        }
    });
}


/*************** RENDERING PROFILE SETTINGS ****************/
const renderProfileSettings = async(element, profileSettings, html) => {
    console.log(element.childNodes[1]);
    element.classList.add('profile-nav__link--active');
    element.childNodes[1].classList.add('profile-nav__icon2--active');
    profileSettings.innerHTML = '';
    profileSettings.innerHTML = html;
}


/*************** MAIN FUNCTION FOR LISTENERS ****************/
export const setEventListeners = (url, listeners) => {


    /*************** OVERVIEW LISTENERS WHEN USER IS LOGGED IN ****************/
    const overviewUserLoggedListeners = () => {
        const selectCar = document.querySelector('.overview__drop-down');
        const popupSelectCar = document.querySelector('.popup-select-car');
        const btnDetails = document.querySelectorAll('.btn-details');
        const popupDetails = document.querySelector('.popup-details');




        /******************* POPUP CAR SELECT ******************/
        selectCar.addEventListener('click', (event) => {
            event.preventDefault();

            if(!popupSelectCar.classList.contains('popup-select-car--active')) {
                popupSelectCar.classList.add('popup-select-car--active');
                selectCar.classList.add('overview__drop-down--active');
            }else {
                popupSelectCar.classList.remove('popup-select-car--active');
                selectCar.classList.remove('overview__drop-down--active');
            }
        });



        /******************* POPUP DETAILS CAR ******************/
        // OPEN POPUP
        btnDetails.forEach(el => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
        
                popupDetails.classList.add('popup-details--active');
            })
        });

        //CLOSE POPUP
        popupDetails.addEventListener('click', event => {
            // event.preventDefault();

            if(!event.target.classList.contains('popup-details__content')) {
                popupDetails.classList.remove('popup-details--active');
            }
        });



        /******************* CLOSE POPUP WHEN CLICK OUTSIDE ******************/

        window.addEventListener('click', (event) => {
            // event.preventDefault();
            // console.log(event.target);

            // POPUP CAR-SELECTOR
            if(popupSelectCar.classList.contains('popup-select-car--active')) {
                let i = true;
                const array = ['overview__select-car', 'overview__heading', 'overview__drop-down', 'popup-select-car', 'popup-select-car__item'];

                array.forEach(el => {
                    if(event.target.classList.contains(el)) i = false;
                });

                if(i === true) {
                    popupSelectCar.classList.remove('popup-select-car--active');
                    selectCar.classList.remove('overview__drop-down--active');
                }
            }
        });
    }


    const overviewHomeGuestListeners = () => {
        const buttonDiscover = document.querySelector('.btn-details--big');

        buttonDiscover.addEventListener('click', event => {
            event.preventDefault();

            console.log('clicked');
            document.querySelector('.section-features').scrollIntoView({behavior: 'smooth'});
        })
    }




    /*************** ACCOUNT SETTINGS LISTENERS ****************/
    const accountInfoListeners = () => {
        const profileNavBtns = document.querySelectorAll('.profile-nav__link');
        const profileSettings = document.querySelector('.profile-settings');
        const profileArrowIcons = document.querySelectorAll('.profile-nav__icon2');

        profileNavBtns.forEach( el => {
            el.addEventListener('click', async(event) => {
                event.preventDefault();
                removeActiveClassProfileNav(profileNavBtns, profileArrowIcons, 'profile-nav__link--active', 'profile-nav__icon2--active');
                const loadingImg = '<div class="profile-settings__loading"><img src="img/loading.gif" alt="loading img" class="profile-settings__load-img"/></div>';
                profileSettings.innerHTML = '';
                profileSettings.innerHTML = loadingImg;
                
                const response = await fetch(`http://127.0.0.1:3000/api/v1/pages/subpage/${el.id}`);
                const result = await response.json();
                renderProfileSettings(el, profileSettings, result.page);
            });
        });
    }



    // try{
        
    // } catch(err) {
    //     console.log(err);
    //     // setTimeout(() => {
    //     //     setEventListeners(url);
    //     // }, 500);
    // }

    if(url === 'overview' && listeners === 'overview-user') {
        overviewUserLoggedListeners();
    }else if(url ==='account-info' && listeners === 'account') {
        accountInfoListeners();
    }else if(url === 'overview' && listeners === 'home'){
        overviewHomeGuestListeners();
    }
    
}