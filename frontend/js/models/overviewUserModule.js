import {showAlertMessages} from './../utils/helpFunctions.js';
import {renderOverviewDetails, renderPopupDetails} from './../views/overviewViews.js';
import {getFetchRequests, patchFetchRequest} from './../utils/fetchRequests.js';

/*************** OVERVIEW LISTENERS WHEN USER IS LOGGED IN ****************/
export const overviewUserLoad = () => {
    const overviewHeading = document.querySelector('.overview__heading');
    const selectCar = document.querySelector('.overview__drop-down');
    const popupSelectCar = document.querySelector('.popup-select-car');

    const dom = {
        registerNo: document.querySelector('.overview__register-no'),
        vin: document.querySelector('.overview__vin'),
        carName: document.querySelector('.overview__heading')
    };


    /******************* DROP-DOWN CAR SELECT ******************/
    [overviewHeading, selectCar].forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
    
            if(!popupSelectCar.classList.contains('popup-select-car--active')) {
                popupSelectCar.classList.add('popup-select-car--active');
                selectCar.classList.add('overview__drop-down--active');
            }else {
                popupSelectCar.classList.remove('popup-select-car--active');
                selectCar.classList.remove('overview__drop-down--active');
            }
        });
    });

    /******************* CLOSE POPUP WHEN CLICK OUTSIDE ******************/
    window.addEventListener('click', (event) => {
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

    
    // DROP-DOWN SELECT CAR FROM LIST
    const dropDownSelectCarItems = document.querySelectorAll('.popup-select-car__item');
    dropDownSelectCarItems.forEach( el => {
        el.addEventListener('click', async event => {
            const loading = `<div style="grid-column: 1 / 3; text-align: center;"><img src="./../../img/loading.gif" alt="loading img"/></div>`;
            document.querySelector('.details__list').innerHTML = loading;
            const searchWord = event.target.childNodes[0].textContent;

            const json = await getFetchRequests(`api/v1/cars/find-my-car/${searchWord}`);

            if(json.status === 'success') {
                popupSelectCar.classList.remove('popup-select-car--active');
            }

            dom.registerNo.childNodes[2].textContent = json.car.registerNo;
            dom.vin.childNodes[1].textContent = json.car.vin;
            dom.carName.textContent = `${json.car.brand} ${json.car.model}`;

            renderOverviewDetails([json.car]);
            viewMoreDetails();
        });
    });



    // VIEW MORE DETAILS POPUP FOR DETAILS LIST
    const viewMoreDetails = () => {
        const viewMore = document.querySelectorAll('.btn-details');

        viewMore.forEach( el => {
            el.addEventListener('click', async event => {
                let searchWord = dom.registerNo.childNodes[2].textContent.trim();

                const json = await getFetchRequests(`api/v1/cars/find-my-car/${searchWord}`);
    
                renderPopupDetails(json.car, event.target.id);
    
                // CLOSE POPUP CAR DETAILS WHEN CLICK OUTSIDE THE POPUP CONTENT
                document.querySelector('.popup-details').addEventListener('click', event2 => {

                    if(event2.target.classList.contains('popup-details')) {
                        document.querySelector('.popup-details').remove('popup-details--active');
                    }
                });
    
                // CLOSE POPUP CAR DETAILS WHEN PRESS CLOSE ICON
                document.querySelector('.popup-details__close').addEventListener('click', event3 => {
                    
                    document.querySelector('.popup-details').remove('popup-details--active');
                });
    
                // ADD EVENT LISTENER FOR EDIT BUTTON FROM THE POPUP DETAILS CONTENT
                const edit = document.getElementById(`edit-${event.target.id}`);
                edit.addEventListener('click', async event4 => {
                    const validFrom = document.getElementById('validFrom');
                    const validTo = document.getElementById('validTo');

                    const bodyData = {
                        data: {
                            validFrom: validFrom.value,
                            validTo: validTo.value,
                        }
                    }
    
                    const json = await patchFetchRequest(`api/v1/cars/update-my-car/${searchWord}/${event.target.id}`, bodyData);

                    if(json.status === 'fail' || json.status === 'error'){
                        showAlertMessages(json.status, json.message, 'body', 4, '');
                    }else if(json.status === 'success') {
                        showAlertMessages(json.status, 'Data update successfully', 'body', 1.5, 'reload');
                    }
    
                });
    
    
            });
        });
    }

    viewMoreDetails();

    
}