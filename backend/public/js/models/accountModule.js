import {domNavBar, domEditProfile, domPasswordSecurity, loadDOMeditProfile,
    loadDOMpasswordSecurity, showLoadingImage, renderProfileSettings,
    removeActiveClassProfileNav, clearInputsAndSetButtonName} from './../views/accountView.js';
import {showAlertMessages} from '../utils/helpFunctions.js';
import {getFetchRequests, patchFetchRequest, postImageRequest} from '../utils/fetchRequests.js';


                        /*****************************
                            *  EDIT PROFILE DETAILS 
                        * *****************************/


const editProfileModule = () => {
    loadDOMeditProfile();

    domEditProfile.changeFileBtn.addEventListener('click', () => {
        domEditProfile.file.click();
    });

    // CHANGE USER PHOTO

    domEditProfile.file.addEventListener('change', changeUserPhoto);
    async function changeUserPhoto(event) {
        let formData = new FormData();
        formData.append('file', domEditProfile.file.files[0]);

        const json = await postImageRequest('api/v1/users/upload-my-photo', formData);

        domEditProfile.userPhotoElement.src = json.photo;
        document.querySelector('.header__user-photo').src = json.photo;

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages(json.status, json.message, '.content-account', 4, '');
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Photo successfully uploaded', '.content-account', 4, '');
        }
    }




    // SAVE ACCOUNT USER's DETAILS

    domEditProfile.saveBtn.addEventListener('click', saveUserDetails);
    async function saveUserDetails(event) {
        event.preventDefault();
        domEditProfile.saveBtn.textContent = 'Loading...';

        const bodyData = {
            firstName: domEditProfile.firstName.value,
            lastName: domEditProfile.lastName.value,
            email: domEditProfile.email.value,
            phone: domEditProfile.phone.value,
            address: domEditProfile.address.value,
            city: domEditProfile.city.value,
            state: domEditProfile.state.value,
            zipCode: domEditProfile.zipCode.value,
            country: domEditProfile.country.value
        };

        const json = await patchFetchRequest('api/v1/users/update-me', bodyData);

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages(json.status, json.message, '.content-account', 4, '');
            domEditProfile.saveBtn.textContent = 'Save';
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Account update successfully', '.content-account', 3, '');
            domEditProfile.saveBtn.textContent = 'Save';
        }
    }
}

                    /**********************************************************/












                        /*****************************
                            *  EDIT PASSWORD-SECURITY
                        * *****************************/

const passwordSecurityModule = () => {
    loadDOMpasswordSecurity();

    domPasswordSecurity.btnUpdate.addEventListener('click', changePassword);
    async function changePassword(event) {
        event.preventDefault();
        domPasswordSecurity.btnUpdate.textContent = 'Loading...';

        const bodyData = {
            oldPassword: domPasswordSecurity.oldPassword.value,
            password: domPasswordSecurity.password.value,
            confirmPassword: domPasswordSecurity.confirmPassword.value
        };

        const json = await patchFetchRequest('api/v1/users/update-password', bodyData);

        if(json.status === 'fail' || json.status === 'error'){
            showAlertMessages(json.status, json.message, '.content-account', 4, '');
        }else if(json.status === 'success') {
            showAlertMessages(json.status, 'Password update successfully', '.content-account', 2, 'reload');
        }

        clearInputsAndSetButtonName();
    }
}
    

                /**********************************************************/















/*************** ACCOUNT SETTINGS LISTENERS ****************/
export const accountSettingsModule = () => {
    //LOAD EDIT-PROFILE DOM
    editProfileModule();

    // Change subpage account setings
    domNavBar.navBarBtns.forEach( el => {
        el.addEventListener('click', async(event) => {
            event.preventDefault();
            showLoadingImage();
            removeActiveClassProfileNav();

            const result = await getFetchRequests(`subpage/${el.id}`);

            renderProfileSettings(el, result.file);
            if(el.id === 'edit-profile') editProfileModule();
            if(el.id=== 'password-security') passwordSecurityModule();
        });
    });

}