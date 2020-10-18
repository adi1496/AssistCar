import {showAlertMessages} from './../utils/helpFunctions.js';
import {postFetchRequest} from './../utils/fetchRequests.js';



/*****************************************
 *                  LOG IN
 ****************************************/

export const loginLoad = async () => {
    const domElements = {
        emailInput: document.getElementById('email'),
        passwordInput: document.getElementById('password'),
        loginBtn: document.getElementById('login-btn')
    };

    domElements.loginBtn.addEventListener('click', async(event) => {
        event.preventDefault();

        const bodyData = {
            email: domElements.emailInput.value,
            password: domElements.passwordInput.value
        };
        

        let json = await postFetchRequest('api/v1/users/login', bodyData);
        // if(json.status === 'success') window.location.href = '#acount-info';
        console.log(json);

        if(json.status === 'fail' || json.status === 'error'){
            domElements.emailInput.value = '';
            domElements.passwordInput.value = '';
            showAlertMessages(json.status, json.message, 'body', 4, '');
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Login sucessfully...', 'body', 2, '#overview');
        }

    });
}





/*****************************************
 *                  SIGN UP
 ****************************************/


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

        const bodyData = {
            firstName: dom.firstName.value,
            lastName: dom.lastName.value,
            email: dom.email.value,
            password: dom.password.value,
            confirmPassword: dom.confirmPassword.value,
            isCompany: dom.isCompany.checked,
            companyName: companyName
        };

        let json = await postFetchRequest('api/v1/users/signup', bodyData);

        console.log(json);

        if(json.status === 'fail' || json.status === 'error'){
            dom.password.value = '';
            dom.confirmPassword.value = '';
            dom.signupBtn.textContent = 'Sign Up';
            showAlertMessages(json.status, json.message, 'body', 4, '');
        }else if(json.status === 'success') {
            dom.password.value = '**********';
            dom.confirmPassword.value = '**********';
            dom.firstName.disabled = 'disabled';
            dom.lastName.disabled = 'disabled';
            dom.email.disabled = 'disabled';
            dom.password.disabled = 'disabled';
            dom.confirmPassword.disabled = 'disabled';

            dom.signupBtn.textContent = 'Success!';
            dom.signupBtn.style.backgroundColor = 'green';
            dom.signupBtn.removeAttribute('id');
            delete dom.signupBtn;

            showAlertMessages(json.status, 'Account created successfully! You can login now...', 'body', 10, '');
        }

    });
}