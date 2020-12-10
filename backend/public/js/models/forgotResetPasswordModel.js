import {postFetchRequest} from '../utils/fetchRequests.js';
import {showAlertMessages} from '../utils/helpFunctions.js';




export const forgotPasswordModule = () => {
    const dom = {
        resetPasswordBtn: document.getElementById('reset-btn'),
        emailInput: document.getElementById('email')
    }
    
    dom.resetPasswordBtn.addEventListener('click', async event => {
        event.preventDefault();
        dom.resetPasswordBtn.textContent = 'Loading...';

        const bodyData = {
            email: dom.emailInput.value
        }
    
        const json = await postFetchRequest('api/v1/users/forgot-password', bodyData);
    
        if(json.status === 'success') {
            showAlertMessages(json.status, 'Success! Check your email account in order to reset your password', 'body', 5, '');
            dom.emailInput.value = '';
            dom.emailInput.disabled = true;
        }else{
            showAlertMessages(json.status, json.message, 'body', 5, '');
        }
        dom.resetPasswordBtn.textContent = 'Reset Password';
    }); 
}