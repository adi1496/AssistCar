export const domNavBar = {
    navBarBtns: document.querySelectorAll('.profile-nav__link'),
    profileSettingsContainer: document.querySelector('.profile-settings'),
    navBarArrowIcons: document.querySelectorAll('.profile-nav__icon2')
};

export const loadDOMeditProfile = () => {
    domEditProfile.firstName = document.getElementById('first-name');
    domEditProfile.lastName = document.getElementById('last-name');
    domEditProfile.email = document.getElementById('email');
    domEditProfile.phone = document.getElementById('phone');
    domEditProfile.address = document.getElementById('address');
    domEditProfile.city = document.getElementById('city');
    domEditProfile.state = document.getElementById('state');
    domEditProfile.zipCode = document.getElementById('zip-code');
    domEditProfile.country = document.getElementById('country');
    domEditProfile.saveBtn = document.querySelector('.btn-save');
    domEditProfile.file = document.getElementById('file');
    domEditProfile.changeFileBtn = document.querySelector('.profile-settings__icon-small');
    domEditProfile.userPhotoElement = document.querySelector('.profile-settings__img');
}
export const domEditProfile = {};



export const loadDOMpasswordSecurity = () => {
    domPasswordSecurity.oldPassword = document.getElementById('old-password');
    domPasswordSecurity.password = document.getElementById('new-password');
    domPasswordSecurity.confirmPassword = document.getElementById('confirm-password');
    domPasswordSecurity.btnUpdate = document.querySelector('.btn-save__change-pass');
}
export const domPasswordSecurity = {};


export const showLoadingImage = () => {
    const loadingImg = '<div class="profile-settings__loading"><img src="img/loading.gif" alt="loading img" class="profile-settings__load-img"/></div>';
    // dom.profileSettingsContainer.innerHTML = '';
    domNavBar.profileSettingsContainer.innerHTML = loadingImg;
}

export const removeActiveClassProfileNav = () => {
    domNavBar.navBarBtns.forEach( el => {
        if(el.classList.contains('profile-nav__link--active')) {
            el.classList.remove('profile-nav__link--active');
        }
    });

    domNavBar.navBarArrowIcons.forEach( el => {
        if(el.classList.contains('profile-nav__icon2--active')) {
            el.classList.remove('profile-nav__icon2--active');
        }
    });
}



export const renderProfileSettings = async(element, html) => {
    element.classList.add('profile-nav__link--active');
    element.childNodes[1].classList.add('profile-nav__icon2--active');
    domNavBar.profileSettingsContainer.innerHTML = html;
}






export const clearInputsAndSetButtonName = () => {
    domPasswordSecurity.btnUpdate.textContent = 'Update password';
    domPasswordSecurity.oldPassword.value = '';
    domPasswordSecurity.password.value = '';
    domPasswordSecurity.confirmPassword.value = '';
}