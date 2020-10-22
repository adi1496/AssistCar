import {showAlertMessages} from './../utils/helpFunctions.js';
import {postFetchRequest} from './../utils/fetchRequests.js';

export const loginModule = async () => {
    const dom = {
        emailInput: document.getElementById('email'),
        passwordInput: document.getElementById('password'),
        loginBtn: document.getElementById('login-btn')
    };

    dom.loginBtn.addEventListener('click', async(event) => {
        event.preventDefault();

        const bodyData = {
            email: dom.emailInput.value,
            password: dom.passwordInput.value
        };
        

        let json = await postFetchRequest('api/v1/users/login', bodyData);

        if(json.status === 'fail' || json.status === 'error'){
            dom.emailInput.value = '';
            dom.passwordInput.value = '';
            showAlertMessages(json.status, json.message, 'body', 4, '');
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Login sucessfully...', 'body', 2, 'reload');
        }

    });
}
