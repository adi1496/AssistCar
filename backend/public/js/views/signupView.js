export const dom = {
    checkboxField: document.querySelector('.log-sign__box--checkBox'),
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    isCompany: document.getElementById('isCompany'),
    signupBtn: document.getElementById('signupBtn')
};


export const createElement = () => {
    // <div class="log-sign__box">
    //     <label for="last-name" class="log-sign__label">Last Name</label>
    //     <input type="text" class="log-sign__input" id="last-name">
    // </div>

    return `<div class="log-sign__box log-sign__box--company">
    <label for="company-name" class="log-sign__label">Company Name</label>
    <input type="text" class="log-sign__input" id="company-name">
    </div>`
}

export const resetPasswordInputAndButtonText = () => {
    dom.password.value = '';
    dom.confirmPassword.value = '';
    dom.signupBtn.textContent = 'Sign Up';
}

export const blockFields = () => {
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
}