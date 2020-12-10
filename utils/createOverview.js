// <ul class="details__list"></ul>


exports.createOverviewBar = (file, cars, car) => {
    if(cars.length > 0){
        file = file.replace('{%car-name%}', `${car.brand} ${car.model}`);
        file = file.replace('{%registerNo%}', car.registerNo);
        file = file.replace('{%vin%}', car.vin);
        let selectCarList = '';
        cars.forEach(el => {
            selectCarList += `<div class="popup-select-car__item"><span>${el.registerNo}</span> ${el.brand} ${el.model}</div>`;
        });
        file = file.replace('{%select-car%}', selectCarList);

    }else {
        file = file.replace('{%car-name%}', `No Car Registered`);
        file = file.replace('{%registerNo%}', '');
        file = file.replace('{%vin%}', '');
    }
    

    return file;
}




const calculateDatePercentLeft = (date1, date2) => {
    let dateNow = new Date(Date.now());
    let percent = ((date2.getTime() - dateNow.getTime()) * 100) / (date2.getTime() - date1.getTime());
    if(dateNow.getTime() < date1.getTime()){
        percent = 0;
    }else if(dateNow.getTime() > date2.getTime()){
        percent = 100;
    }else {
        percent = Math.floor(100 - percent);
    }

    return percent;
}

const changeDateFormat = (date) => {
    const month = date.getMonth() + 1 < 10  ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10  ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${day}.${month}.${date.getFullYear()}`;
}

const createElement = (property, element, title) => {
    
    let date1 = new Date(element.validFrom);
    let date2 = new Date(element.validTo);
    let outElement
    if(date1.getFullYear() === 1970 && date2.getFullYear() === 1970){
        outElement = `<li class="details__item">
        <div class="details__title">${title}</div>
        <div class="details__valid">${title} -- Not set</span> (<span class="percent-values" id="percent-${property}">0%</span>)</div>
        <div class="details__progress" id="progress-${property}"></div>
        <button class="btn-details" id="${property}">View more</button>
        </li>`;
    }else {
        const percent = calculateDatePercentLeft(date1, date2);
        const validFrom = changeDateFormat(date1);
        const validTo = changeDateFormat(date2);
    
        outElement = `<li class="details__item">
        <div class="details__title">${title}</div>
        <div class="details__valid">Today's date: <span>${changeDateFormat(new Date(Date.now()))}</span></div>
        <div class="details__valid">Valid from <span>${validFrom}</span> to <span>${validTo}</span> (<span class="percent-values" id="percent-${property}">${percent}%</span>)</div>
        <div class="details__progress" id="progress-${property}"></div>
        <button class="btn-details" id="${property}">View more</button>
    </li>`;
    }

    return outElement;
}


exports.createOverviewDetails = (car) => {

    // console.log(car);
    let detailsList = `<ul class="details__list">{%list%}</ul>`;
        let elements = '';

    for(let property in car) {
        if(property === 'insurance'){
            elements +=  createElement(property, car[property], 'MTPL Insurance (RCA)');
        }else if(property === 'casco') {
            elements += createElement(property, car[property], 'Casco Insurance');
        }else if(property === 'tehnicalInspection') {
            elements += createElement(property, car[property], 'Tehnical Inspection');
        }else if(property === 'fireExtinguisher') {
            elements += createElement(property, car[property], 'Fire Extinguisher');
        }else if(property === 'medicalKit') {
            elements += createElement(property, car[property], 'Medical Kit');
        }else if(property === 'roadVignete') {
            elements += createElement(property, car[property], 'Road Vignete');
        }
    }

    detailsList = detailsList.replace('{%list%}', elements);

    return detailsList;
}




/************ CHANGE DATE FORMAT TO YYYY/MM/DD *****************/
const changeFormatForCalendarInput = (date) => {
    const month = date.getMonth() + 1 < 10  ? `0${date.getMonth() + 1}`: `${date.getMonth() + 1}`;
    const day = date.getDate() < 10  ? `0${date.getDate()}`: `${date.getDate()}`;

    return `${date.getFullYear()}-${month}-${day}`;
}

/************ CREATE POPUP DETAILS *****************/
exports.createPopup = (object, id) => {
    const validFrom = new Date(object.validFrom);
    const validTo = new Date(object.validTo);
    const validFromInput = changeFormatForCalendarInput(validFrom);
    const validToInput = changeFormatForCalendarInput(validTo);

    if(validFrom.getFullYear() === 1970 && validTo.getFullYear() === 1970) {
        return `<div class="popup-details popup-details--active">
        <div class="popup-details__container">
            <div class="popup-details__content">
                <div class="popup-details__close">&#9876;</div>
                <div class="popup-details__title">${id.toUpperCase()}</div>
                <div class="popup-details__valid">Valid from: <span>None</span></div>
                <input type="date" id="validFrom" value="${validFromInput}" class="popup-details__date">
                <div class="popup-details__valid">Valid to: <span>None</span></div>
                <input type="date" id="validTo" value="${validToInput}" class="popup-details__date">
                <button class="btn-details" id="edit-${id}">Edit</button>
            </div>
        </div>
    </div>`;
    }else {
        return `<div class="popup-details popup-details--active">
        <div class="popup-details__container">
            <div class="popup-details__content">
                <div class="popup-details__close">&#9876;</div>
                <div class="popup-details__title">${id.toUpperCase()}</div>
                <div class="popup-details__valid">Valid from: <span>${changeDateFormat(validFrom)}</span></div>
                <input type="date" id="validFrom" value="${validFromInput}" class="popup-details__date">
                <div class="popup-details__valid">Valid to: <span>${changeDateFormat(validTo)}</span></div>
                <input type="date" id="validTo" value="${validToInput}" class="popup-details__date">
                <button class="btn-details" id="edit-${id}">Edit</button>
            </div>
        </div>
    </div>`;
    }
}