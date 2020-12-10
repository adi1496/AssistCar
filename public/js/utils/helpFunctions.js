
const renderAlertPopup = (message, color) => {
    let popup = document.createElement('div');

    popup.classList.add(`alert-popup`);
    if(color === 'red') popup.classList.add(`alert-popup--${color}`);
    popup.textContent = message;

    return popup;
}

export const showAlertMessages = (status, message, parent, time, reload) => {
    if(status === 'fail' || status === 'error'){
        const popup = renderAlertPopup(message, 'red');
        document.querySelector(parent).insertAdjacentElement('afterbegin', popup);
        if(time !== 0){
            setTimeout(() => {
                document.querySelector('.alert-popup').remove();
            }, time * 1000);
        }
    }else if(status === 'success') {
        const popup = renderAlertPopup(message, '');
        document.querySelector(parent).insertAdjacentElement('afterbegin', popup);
        if(time !== 0){
            setTimeout(() => {
                if(reload === 'reload'){
                    location.reload();
                }else if(reload === '') {

                }else{
                    window.location.href = reload;
                }
                document.querySelector('.alert-popup').remove();
            }, time * 1000);
        }
    }
}
