/* <li class="details__item">
    <div class="details__title">MTPL Insurance (RCA)</div>
    <div class="details__valid">Valid from <span>08.07.2020</span> to <span>07.01.2020</span> (110 days left)</div>
    <div class="details__progress"></div>
    <button class="btn-details">View more</button>
</li> */

//     let date1 = new Date(element.validFrom);
//     let date2 = new Date(element.validTo);
//     let dateNow = new Date(Date.now());
//     let percent = ((date2.getTime() - dateNow.getTime()) * 100) / (date2.getTime() - date1.getTime());
//     percent = Math.floor(100 - percent);
const calculateDatePercentLeft = (date1, date2) => {
    let dateNow = new Date(Date.now());
    let percent = ((date2.getTime() - dateNow.getTime()) * 100) / (date2.getTime() - date1.getTime());
    percent = Math.floor(100 - percent);

    return percent;
}

const changeDateFormat = date => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const createElement = (property, element, title) => {
    let date1 = new Date(element.validFrom);
    let date2 = new Date(element.validTo);
    let outElement
    if(date1.getFullYear() === 1970 && date2.getFullYear() === 1970){
        outElement = `<li class="details__item">
        <div class="details__title">${title}</div>
        <div class="details__valid">${title} -- Not set</span> (<span id="percent-${property}">0%</span>)</div>
        <div class="details__progress" id="progress-${property}"></div>
        <button class="btn-details">View more</button>
        </li>`;
    }else {
        const percent = calculateDatePercentLeft(date1, date2);
        const validFrom = changeDateFormat(date1);
        const validTo = changeDateFormat(date2);
    
        outElement = `<li class="details__item">
        <div class="details__title">${title}</div>
        <div class="details__valid">Valid from <span>${validFrom}</span> to <span>${validTo}</span> (<span id="percent-${property}">${percent}%</span>)</div>
        <div class="details__progress" id="progress-${property}"></div>
        <button class="btn-details">View more</button>
    </li>`;
    }

    // console.log(outElement);
    return outElement;
}

const createDropDownElement = (registerNo, brand, model) => {
    // <div class="popup-select-car__item">Ford Focus</div>
    return `<div class="popup-select-car__item"><span>${registerNo}</span> ${brand} ${model}</div>`;
}

export const renderOverviewDetails = (cars) => {
    console.log(cars);
    if(cars.length !== 0){
        console.log('Plm');
        const registerNo = document.querySelector('.overview__register-no').textContent.trim();
        console.log(registerNo);
        const detailsList = document.querySelector('.details__list');
        let elements = {
            insurance: '',
            casco: '',
            tehnicalInspection: '',
            fireExtinguisher: '',
            medicalKit: '',
            roadVignete: ''
        };
        cars.forEach( el => {
            if(el.registerNo === registerNo) {
                console.log(el);
                for(let property in el) {
                    if(property === 'insurance'){
                        elements.insurance =  createElement(property, el[property], 'MTPL Insurance (RCA)');
                    }else if(property === 'casco') {
                        elements.casco = createElement(property, el[property], 'Casco Insurance');
                    }else if(property === 'tehnicalInspection') {
                        elements.tehnicalInspection = createElement(property, el[property], 'Tehnical Inspection');
                    }else if(property === 'fireExtinguisher') {
                        elements.fireExtinguisher = createElement(property, el[property], 'Fire Extinguisher');
                    }else if(property === 'medicalKit') {
                        elements.medicalKit = createElement(property, el[property], 'Medical Kit');
                    }else if(property === 'roadVignete') {
                        elements.roadVignete = createElement(property, el[property], 'Road Vignete');
                    }
                }
            }
        });
    
        detailsList.innerHTML = '';
        for(let property in elements) {
            detailsList.insertAdjacentHTML('beforeend', elements[property]);
        }
    
        // setTimeout(() => {
            
        // }, 500)
    
        let root = document.documentElement;
        for(let property in elements) {
            let percent = document.getElementById(`percent-${property}`).textContent;
            root.style.setProperty(`--progress-${property}`, percent);
        }
    
    
    
    
        //SET POPUP SELECT-CAR
        const dropDownSelectCar = document.querySelector('.popup-select-car');
        cars.forEach(el => {
            dropDownSelectCar.insertAdjacentHTML('beforeend', createDropDownElement(el.registerNo, el.brand, el.model));
        })
    }

}