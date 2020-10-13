import {renderAlertPopup} from './../views/renderPage.js';
import {showAlertMessages} from './../utils/helpFunctions.js';

/*************** REMOVE ALL ACTIVE CLASSES FROM PROFILE NAVIGATION ****************/
const removeActiveClassProfileNav = (profileNavBtns, profileArrowIcons, class1, class2) => {
    profileNavBtns.forEach( el => {
        if(el.classList.contains(class1)) {
            el.classList.remove(class1);
        }
    });

    profileArrowIcons.forEach( el => {
        if(el.classList.contains(class2)) {
            el.classList.remove(class2);
        }
    });
}


/*************** RENDERING PROFILE SETTINGS ****************/
const renderProfileSettings = async(element, profileSettings, html) => {
    // console.log(element.childNodes[1]);
    element.classList.add('profile-nav__link--active');
    element.childNodes[1].classList.add('profile-nav__icon2--active');
    profileSettings.innerHTML = '';
    profileSettings.innerHTML = html;
}






/*************** ACCOUNT SETTINGS LISTENERS ****************/
export const accountSettingsLoad = () => {
    const profileNavBtns = document.querySelectorAll('.profile-nav__link');
    const profileSettings = document.querySelector('.profile-settings');
    const profileArrowIcons = document.querySelectorAll('.profile-nav__icon2');

    profileNavBtns.forEach( el => {
        el.addEventListener('click', async(event) => {
            event.preventDefault();
            removeActiveClassProfileNav(profileNavBtns, profileArrowIcons, 'profile-nav__link--active', 'profile-nav__icon2--active');
            const loadingImg = '<div class="profile-settings__loading"><img src="img/loading.gif" alt="loading img" class="profile-settings__load-img"/></div>';
            profileSettings.innerHTML = '';
            profileSettings.innerHTML = loadingImg;
            
            const response = await fetch(`http://127.0.0.1:3000/api/v1/pages/subpage/${el.id}`, {
                credentials: 'include'
            });
            const result = await response.json();
            renderProfileSettings(el, profileSettings, result.page);
            if(result.listeners === 'edit-profile') loadEditProfile();
            if(result.listeners === 'password-security') loadPasswordSecurity();
        });
    });
}

export const loadEditProfile = () => {
    const dom = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        address: document.getElementById('address'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        zipCode: document.getElementById('zip-code'),
        country: document.getElementById('country'),
        saveBtn: document.querySelector('.btn-save'),
        file: document.getElementById('file')
    };

    document.querySelector('.profile-settings__icon-small').addEventListener('click', () => {
        document.getElementById('file').click();
    });

    dom.file.addEventListener('change', async event => {
        const userPhoto = document.querySelector('.profile-settings__img');

        let formData = new FormData();
        formData.append('file', dom.file.files[0]);
        
        const response = await fetch('http://127.0.0.1:3000/api/v1/users/upload-my-photo', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        });

        const json = await response.json();

        userPhoto.src = json.photo;

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages(json.status, json.message, '.content-account', 4, '');
            dom.saveBtn.textContent = 'Save';
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Photo successfully uploaded', '.content-account', 2, 'reload');
            dom.saveBtn.textContent = 'Save';
        }

    });

    dom.saveBtn.addEventListener('click', async event => {
        event.preventDefault();

        dom.saveBtn.textContent = 'Loading...';

        const response = await fetch('http://127.0.0.1:3000/api/v1/users/update-me', {
            method: 'PATCH',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: dom.firstName.value,
                lastName: dom.lastName.value,
                email: dom.email.value,
                phone: dom.phone.value,
                address: dom.address.value,
                city: dom.city.value,
                state: dom.state.value,
                zipCode: dom.zipCode.value,
                country: dom.country.value
            })
        });

        const json = await response.json();

        console.log(json);

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages(json.status, json.message, '.content-account', 4, '');
            dom.saveBtn.textContent = 'Save';
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Account update successfully', '.content-account', 3, '');
            dom.saveBtn.textContent = 'Save';
        }
    });

}

const loadPasswordSecurity = async() => {
    const dom = {
        oldPassword: document.getElementById('old-password'),
        password: document.getElementById('new-password'),
        confirmPassword: document.getElementById('confirm-password'),
        btnUpdate: document.querySelector('.btn-save__change-pass')
    };

    dom.btnUpdate.addEventListener('click', async event => {
        event.preventDefault();

        dom.btnUpdate.textContent = 'Loading...';
        console.log(dom.oldPassword.value);

        const response = await fetch('http://127.0.0.1:3000/api/v1/users/update-password', {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword: dom.oldPassword.value,
                password: dom.password.value,
                confirmPassword: dom.confirmPassword.value
            })
        });

        const json = await response.json();

        console.log(json);

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages(json.status, json.message, '.content-account', 4, '');
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Password update successfully', '.content-account', 3, 'reload');
        }

        dom.btnUpdate.textContent = 'Update password';
        dom.oldPassword.value = '';
        dom.password.value = '';
        dom.confirmPassword.value = '';

    });
}