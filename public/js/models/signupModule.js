import {dom, createElement,
    resetPasswordInputAndButtonText, blockFields} from './../views/signupView.js';
import {postFetchRequest} from './../utils/fetchRequests.js';
import {showAlertMessages} from './../utils/helpFunctions.js';

export const signupModule = async () => {
    dom.isCompany.addEventListener('change', event => {
        if(isCompany.checked === true) {
            dom.checkboxField.insertAdjacentHTML('afterend', createElement());
            dom.companyName = document.querySelector('#company-name');
        }else {
            document.querySelector('.log-sign__box--company').remove();
            delete dom.companyName;
        }
    });

    signupBtn.addEventListener('click', async event => {
        event.preventDefault();

        dom.signupBtn.textContent = 'Loading...';

        let companyName = undefined;
        if(isCompany.checked === true) {
            companyName = dom.companyName.value;
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
            resetPasswordInputAndButtonText();
            showAlertMessages(json.status, json.message, 'body', 4, '');
        }else if(json.status === 'success') {
            blockFields();
            showAlertMessages(json.status, 'Account created successfully! You can login now...', 'body', 10, '');
        }

    });
}