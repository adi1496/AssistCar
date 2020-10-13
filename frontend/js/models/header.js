import {renderAlertPopup} from './../views/renderPage.js';


export const loadHeaderUserLogged = () => {
    const domElements = {
        headerUser: document.querySelector('.header__user'),
        headerDropDown: document.querySelector('.header__drop-down'),
        logOutBtn: document.getElementById('logout')
    };

    domElements.headerUser.addEventListener('click', event => {
        if(domElements.headerDropDown.classList.contains('header__drop-down--active')){
            domElements.headerDropDown.classList.remove('header__drop-down--active');
        }else {
            console.log('doesn not contain');
            domElements.headerDropDown.classList.add('header__drop-down--active');
        }
    });

    // domElements.headerDropDown.addEventListener('click', event => {
        
    // })

    domElements.logOutBtn.addEventListener('click', async event => {
        event.preventDefault();

        let response = await fetch('http://127.0.0.1:3000/api/v1/users/logout', {
            credentials: 'include'
        });

        let json = await response.json();

        if(json.status === 'fail' || json.status === 'error'){
            const popup = renderAlertPopup(json.message, 'red');
            document.querySelector('body').insertAdjacentElement('afterbegin', popup);
            setTimeout(() => {
                document.querySelector('.alert-popup').remove();
            }, 4000);
        }else if(json.status === 'success') {
            const popup = renderAlertPopup('LogOut successfully', '');
            document.querySelector('body').insertAdjacentElement('afterbegin', popup);
            setTimeout(() => {
                window.location.href = '#home';
            }, 3000);
        }
    })
}