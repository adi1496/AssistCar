// import axios from 'axios';
import {renderAlertPopup} from './../views/renderPage.js';

export const loginLoad = async () => {
    const domElements = {
        emailInput: document.getElementById('email'),
        passwordInput: document.getElementById('password'),
        loginBtn: document.getElementById('login-btn')
    };

    domElements.loginBtn.addEventListener('click', async(event) => {
        event.preventDefault();

        let response = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: domElements.emailInput.value,
                password: domElements.passwordInput.value
            })
        });
        

        let json = await response.json();
        // if(json.status === 'success') window.location.href = '#acount-info';
        console.log(json);

        if(json.status === 'fail' || json.status === 'error'){
            const popup = renderAlertPopup(json.message, 'red');
            document.querySelector('.content-log-sign').insertAdjacentElement('afterbegin', popup);
            domElements.emailInput.value = '';
            domElements.passwordInput.value = '';
            setTimeout(() => {
                document.querySelector('.alert-popup').remove();
            }, 4000);
        }else if(json.status === 'success') {
            const popup = renderAlertPopup('Login successfully', '');
            document.querySelector('.content-log-sign').insertAdjacentElement('afterbegin', popup);
            setTimeout(() => {
                window.location.href = '#overview';
            }, 3000);
        }

    });
}

const createElement = () => {
    // <div class="log-sign__box">
    //     <label for="last-name" class="log-sign__label">Last Name</label>
    //     <input type="text" class="log-sign__input" id="last-name">
    // </div>

    return `<div class="log-sign__box log-sign__box--company">
    <label for="company-name" class="log-sign__label">Company Name</label>
    <input type="text" class="log-sign__input" id="company-name">
    </div>`
}

//SIGN UP
export const signupLoad = async () => {
    const dom = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        isCompany: document.getElementById('isCompany'),
        signupBtn: document.getElementById('signupBtn')
    };

    isCompany.addEventListener('change', event => {
        if(isCompany.checked === true) {
            document.querySelector('.log-sign__box--checkBox').insertAdjacentHTML('afterend', createElement());
        }else {
            document.querySelector('.log-sign__box--company').remove();
        }
    });

    signupBtn.addEventListener('click', async event => {
        event.preventDefault();

        dom.signupBtn.textContent = 'Loading...';

        let companyName = undefined;
        if(isCompany.checked === true) {
            companyName = document.querySelector('#company-name').value;
            
        }

        const response = await fetch('http://127.0.0.1:3000/api/v1/users/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: dom.firstName.value,
                lastName: dom.lastName.value,
                email: dom.email.value,
                password: dom.password.value,
                confirmPassword: dom.confirmPassword.value,
                isCompany: dom.isCompany.checked,
                companyName: companyName
            })
        });

        let json = await response.json();

        console.log(json);

        if(json.status === 'fail' || json.status === 'error'){
            const popup = renderAlertPopup(json.message, 'red');
            document.querySelector('.content-log-sign').insertAdjacentElement('afterbegin', popup);
            dom.password.value = '';
            dom.confirmPassword.value = '';
            dom.signupBtn.textContent = 'Fail!';
            dom.signupBtn.style.backgroundColor = 'red';
            setTimeout(() => {
                console.log('remove');
                document.querySelector('.alert-popup').remove();
                dom.signupBtn.textContent = 'Sign Up';
                dom.signupBtn.style.backgroundColor = '#E64A19';
            }, 4000);
        }else if(json.status === 'success') {
            const popup = renderAlertPopup('Account created successfully! You can login now...', '');
            document.querySelector('.content-log-sign').insertAdjacentElement('afterbegin', popup);

            dom.firstName.disabled = 'disabled';
            dom.lastName.disabled = 'disabled';
            dom.email.disabled = 'disabled';
            dom.password.disabled = 'disabled';
            dom.confirmPassword.disabled = 'disabled';

            dom.signupBtn.textContent = 'Success!';
            dom.signupBtn.style.backgroundColor = 'green';
            dom.signupBtn.removeAttribute('id');
            delete dom.signupBtn;

            setTimeout(() => {
                document.querySelector('.alert-popup').remove();
            }, 10000);
        }
    });
}