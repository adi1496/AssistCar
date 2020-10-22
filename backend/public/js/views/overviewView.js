export const initDom = () => {
    dom.overviewHeading = document.querySelector('.overview__heading');
    dom.selectCarDropDownBtn = document.querySelector('.overview__drop-down');
    dom.popupSelectCar = document.querySelector('.popup-select-car');
    dom.registerNo = document.querySelector('.overview__register-no');
    dom.vin = document.querySelector('.overview__vin');
    dom.carName = document.querySelector('.overview__heading');
    dom.dropDownSelectCarItems = document.querySelectorAll('.popup-select-car__item');
    dom.detailsContainer = document.querySelector('.details');
    dom.overviewBar = document.querySelector('.overview');
    dom.percentValuesElements = document.querySelectorAll('.percent-values');
    dom.viewMore = document.querySelectorAll('.btn-details');
}

export const dom = {};

export const removeActiveClassSelectCarDropDownAndArrow = () => {
    dom.popupSelectCar.classList.remove('popup-select-car--active');
    dom.selectCarDropDownBtn.classList.remove('overview__drop-down--active');
}



export const showDropDownList = (event) => {
    event.preventDefault();

    if(!dom.popupSelectCar.classList.contains('popup-select-car--active')) {
        dom.popupSelectCar.classList.add('popup-select-car--active');
        dom.selectCarDropDownBtn.classList.add('overview__drop-down--active');
    }else {
        removeActiveClassSelectCarDropDownAndArrow();
    }
};



export const showLoadingImage = () => {
    const loading = `<div style="grid-column: 1 / 3; text-align: center;"><img src="./../../img/loading.gif" alt="loading img"/></div>`;
    document.querySelector('.details__list').innerHTML = loading;
}



export const renderNewDetails = json => {
    dom.overviewBar.innerHTML = json.overviewBar;
    dom.detailsContainer.innerHTML = json.detailsList;
}



export const renderPopup = json => {
    document.querySelector('.content').insertAdjacentHTML('afterbegin', json.popup);
}



export const closePopupWhenClickOutside = event => {
    if(event.target.classList.contains('popup-details')) {
        document.querySelector('.popup-details').remove();
    }
}

export const closePopupCloseIcon = event => {
    document.querySelector('.popup-details').remove();
}