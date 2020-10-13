import {renderAlertPopup} from './../views/renderPage.js';

export const showAlertMessages = (status, message, parent, sec, reload) => {
    if(status === 'fail' || status === 'error'){
        const popup = renderAlertPopup(message, 'red');
        document.querySelector(parent).insertAdjacentElement('afterbegin', popup);
        if(sec !== 0){
            setTimeout(() => {
                document.querySelector('.alert-popup').remove();
            }, sec * 1000);
        }
    }else if(status === 'success') {
        const popup = renderAlertPopup(message, '');
        document.querySelector(parent).insertAdjacentElement('afterbegin', popup);
        if(sec !== 0){
            setTimeout(() => {
                if(reload === 'reload'){
                    location.reload();
                }else if(reload === '') {

                }else{
                    window.location.href = reload;
                }
                document.querySelector('.alert-popup').remove();
            }, sec * 1000);
        }
    }
}

const hideAlertMessages = (sec) => {
    setTimeout(() => {
        document.querySelector('.alert-popup').remove();
    }, sec * 1000);
}