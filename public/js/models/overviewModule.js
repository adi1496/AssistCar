import {dom, showDropDownList, showLoadingImage, renderNewDetails, initDom,
    removeActiveClassSelectCarDropDownAndArrow,
    renderPopup, closePopupWhenClickOutside,
    closePopupCloseIcon} from './../views/overviewView.js';
import {showAlertMessages} from '../utils/helpFunctions.js';
// import {renderOverviewDetails, renderPopupDetails} from './../views/overviewViews.js';
import {getFetchRequests, patchFetchRequest} from '../utils/fetchRequests.js';




/*************** OVERVIEW LISTENERS WHEN USER IS LOGGED IN ****************/

export const overviewModule = () => {
    initDom();

    // asign values to progress bar
    let root = document.documentElement;
    dom.percentValuesElements = dom.percentValuesElements.forEach( el => {
        root.style.setProperty(`--progress-${el.id.split('-')[1]}`, el.textContent);
    });



    /******************* SHOW DROP-DOWN CAR SELECT ******************/

    [dom.overviewHeading, dom.selectCarDropDownBtn].forEach(el => {
        el.addEventListener('click', showDropDownList);
    });





    /******************* CLOSE POPUP WHEN CLICK OUTSIDE ******************/

    window.addEventListener('click', (event) => {
        // POPUP CAR-SELECTOR
        if(dom.popupSelectCar.classList.contains('popup-select-car--active')) {
            let ok = true;
            const array = ['overview__select-car', 'overview__heading', 'overview__drop-down', 'popup-select-car', 'popup-select-car__item'];

            array.forEach(el => {
                if(event.target.classList.contains(el)) ok = false;
            });

            if(ok === true) removeActiveClassSelectCarDropDownAndArrow()
        }
    });

    
    // DROP-DOWN SELECT CAR FROM LIST

    dom.dropDownSelectCarItems.forEach( el => {
        el.addEventListener('click', async event => {
            const searchWord = event.target.childNodes[0].textContent;

            showLoadingImage();
            removeActiveClassSelectCarDropDownAndArrow();
            const json = await getFetchRequests(`api/v1/cars/find-my-car/${searchWord}`);

            if(json.status === 'success') {
                renderNewDetails(json);
                initDom();
                overviewModule();
            }else {
                window.location.reload();
            }

        });
    });










    // VIEW MORE DETAILS POPUP FOR DETAILS LIST

        dom.viewMore.forEach( el => {
            el.addEventListener('click', viewMoreEvent);
        });


        async function viewMoreEvent(event) {
            let searchWord = dom.registerNo.childNodes[2].textContent.trim();

            const json = await getFetchRequests(`api/v1/cars/get-popup/${searchWord}/${event.target.id}`);

            console.log(json);
            
            renderPopup(json);

            // CLOSE POPUP CAR DETAILS WHEN CLICK OUTSIDE THE POPUP CONTENT
            document.querySelector('.popup-details').addEventListener('click', closePopupWhenClickOutside);

            // CLOSE POPUP CAR DETAILS WHEN PRESS CLOSE ICON
            document.querySelector('.popup-details__close').addEventListener('click', closePopupCloseIcon);



            // ADD EVENT LISTENER FOR EDIT BUTTON FROM THE POPUP DETAILS CONTENT
            const edit = document.getElementById(`edit-${event.target.id}`);
            edit.addEventListener('click', editPopupCarDetails);
        }


        async function editPopupCarDetails(event) {
            let searchWord = dom.registerNo.childNodes[2].textContent.trim();
            const validFrom = document.getElementById('validFrom');
            const validTo = document.getElementById('validTo');

            const bodyData = {
                data: {
                    validFrom: validFrom.value,
                    validTo: validTo.value,
                }
            }

            const json = await patchFetchRequest(`api/v1/cars/update-my-car/${searchWord}/${event.target.id.split('-')[1]}`, bodyData);

            if(json.status === 'fail' || json.status === 'error'){
                showAlertMessages(json.status, json.message, 'body', 4, '');
            }else if(json.status === 'success') {
                showAlertMessages(json.status, 'Data update successfully', 'body', 2, 'reload');
                // window.location.href = `overview/${searchWord}`;
            }

        }

    
}