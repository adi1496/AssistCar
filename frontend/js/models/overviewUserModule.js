import {renderOverviewDetails} from './../views/overviewViews.js';

/*************** OVERVIEW LISTENERS WHEN USER IS LOGGED IN ****************/
export const overviewUserLoad = () => {
    const overviewHeading = document.querySelector('.overview__heading');
    const selectCar = document.querySelector('.overview__drop-down');
    const popupSelectCar = document.querySelector('.popup-select-car');
    const btnDetails = document.querySelectorAll('.btn-details');
    const popupDetails = document.querySelector('.popup-details');




    /******************* POPUP CAR SELECT ******************/
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

        // if(!event.target.classList.contains('header__drop-down--active') && !event.target.classList.contains('header__user')) {
            
        //     document.querySelector('.header__drop-down').classList.remove('header__drop-down--active');
        // }
    });

    
    const dropDownSelectCarItems = document.querySelectorAll('.popup-select-car__item');
    dropDownSelectCarItems.forEach( el => {
        el.addEventListener('click', async event => {
            // event.preventDefault();
            // console.log(event.target.childNodes[0]);
            const searchWord = event.target.childNodes[0].textContent;
            // console.log(searchWord);
            const response = await fetch(`http://127.0.0.1:3000/api/v1/cars/find-my-car/${searchWord}`, {
                credentials: 'include'
            });

            let resJson = await response.json();
            console.log(resJson);
            document.querySelector('.overview__register-no').childNodes[2].textContent = resJson.car.registerNo;
            document.querySelector('.overview__vin').childNodes[1].textContent = resJson.car.vin;
            document.querySelector('.overview__heading').textContent = `${resJson.car.brand} ${resJson.car.model}`;

            renderOverviewDetails([resJson.car]);
        })
    })
}