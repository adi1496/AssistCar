parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"NRVB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.homeModule=void 0;var e=function(){document.querySelector(".btn-details--big").addEventListener("click",function(e){e.preventDefault(),console.log("clicked"),document.querySelector(".section-features").scrollIntoView({behavior:"smooth"})})};exports.homeModule=e;
},{}],"t1Vd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.showAlertMessages=void 0;var e=function(e,t){var r=document.createElement("div");return r.classList.add("alert-popup"),"red"===t&&r.classList.add("alert-popup--".concat(t)),r.textContent=e,r},t=function(t,r,o,n,s){if("fail"===t||"error"===t){var a=e(r,"red");document.querySelector(o).insertAdjacentElement("afterbegin",a),0!==n&&setTimeout(function(){document.querySelector(".alert-popup").remove()},1e3*n)}else if("success"===t){var c=e(r,"");document.querySelector(o).insertAdjacentElement("afterbegin",c),0!==n&&setTimeout(function(){"reload"===s?location.reload():""===s||(window.location.href=s),document.querySelector(".alert-popup").remove()},1e3*n)}};exports.showAlertMessages=t;
},{}],"edb1":[function(require,module,exports) {
"use strict";function e(e,t,r,n,o,c,a){try{var s=e[c](a),u=s.value}catch(p){return void r(p)}s.done?t(u):Promise.resolve(u).then(n,o)}function t(t){return function(){var r=this,n=arguments;return new Promise(function(o,c){var a=t.apply(r,n);function s(t){e(a,o,c,s,u,"next",t)}function u(t){e(a,o,c,s,u,"throw",t)}s(void 0)})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.postImageRequest=exports.postFetchRequest=exports.patchFetchRequest=exports.getFetchRequests=void 0;var r="https://assistcar.herokuapp.com/",n=function(){var e=t(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(r,"/").concat(t));case 3:return n=e.sent,e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t){return e.apply(this,arguments)}}();exports.getFetchRequests=n;var o=function(){var e=t(regeneratorRuntime.mark(function e(t,n){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(r,"/").concat(t),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 3:return o=e.sent,e.next=6,o.json();case 6:return e.abrupt("return",e.sent);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t,r){return e.apply(this,arguments)}}();exports.patchFetchRequest=o;var c=function(){var e=t(regeneratorRuntime.mark(function e(t,n){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(r,"/").concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 3:return o=e.sent,e.next=6,o.json();case 6:return e.abrupt("return",e.sent);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t,r){return e.apply(this,arguments)}}();exports.postFetchRequest=c;var a=function(){var e=t(regeneratorRuntime.mark(function e(t,n){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(r,"/").concat(t),{method:"POST",headers:{},body:n});case 3:return o=e.sent,e.next=6,o.json();case 6:return e.abrupt("return",e.sent);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t,r){return e.apply(this,arguments)}}();exports.postImageRequest=a;
},{}],"pRCI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.loginModule=void 0;var e=require("./../utils/helpFunctions.js"),t=require("./../utils/fetchRequests.js");function n(e,t,n,r,s,u,o){try{var a=e[u](o),i=a.value}catch(c){return void n(c)}a.done?t(i):Promise.resolve(i).then(r,s)}function r(e){return function(){var t=this,r=arguments;return new Promise(function(s,u){var o=e.apply(t,r);function a(e){n(o,s,u,a,i,"next",e)}function i(e){n(o,s,u,a,i,"throw",e)}a(void 0)})}}var s=function(){var n=r(regeneratorRuntime.mark(function n(){var s;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:(s={emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),loginBtn:document.getElementById("login-btn")}).loginBtn.addEventListener("click",function(){var n=r(regeneratorRuntime.mark(function n(r){var u,o;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),u={email:s.emailInput.value,password:s.passwordInput.value},n.next=4,(0,t.postFetchRequest)("api/v1/users/login",u);case 4:"fail"===(o=n.sent).status||"error"===o.status?(s.emailInput.value="",s.passwordInput.value="",(0,e.showAlertMessages)(o.status,o.message,"body",4,"")):"success"===o.status&&(0,e.showAlertMessages)(o.status,"Login sucessfully...","body",2,"reload");case 6:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}());case 2:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}();exports.loginModule=s;
},{"./../utils/helpFunctions.js":"t1Vd","./../utils/fetchRequests.js":"edb1"}],"UQod":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.blockFields=exports.resetPasswordInputAndButtonText=exports.createElement=exports.dom=void 0;var e={checkboxField:document.querySelector(".log-sign__box--checkBox"),firstName:document.getElementById("first-name"),lastName:document.getElementById("last-name"),email:document.getElementById("email"),password:document.getElementById("password"),confirmPassword:document.getElementById("confirmPassword"),isCompany:document.getElementById("isCompany"),signupBtn:document.getElementById("signupBtn")};exports.dom=e;var t=function(){return'<div class="log-sign__box log-sign__box--company">\n    <label for="company-name" class="log-sign__label">Company Name</label>\n    <input type="text" class="log-sign__input" id="company-name">\n    </div>'};exports.createElement=t;var s=function(){e.password.value="",e.confirmPassword.value="",e.signupBtn.textContent="Sign Up"};exports.resetPasswordInputAndButtonText=s;var n=function(){e.password.value="**********",e.confirmPassword.value="**********",e.firstName.disabled="disabled",e.lastName.disabled="disabled",e.email.disabled="disabled",e.password.disabled="disabled",e.confirmPassword.disabled="disabled",e.signupBtn.textContent="Success!",e.signupBtn.style.backgroundColor="green",e.signupBtn.removeAttribute("id"),delete e.signupBtn};exports.blockFields=n;
},{}],"R9az":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.signupModule=void 0;var e=require("./../views/signupView.js"),t=require("./../utils/fetchRequests.js"),n=require("./../utils/helpFunctions.js");function r(e,t,n,r,o,s,a){try{var u=e[s](a),i=u.value}catch(c){return void n(c)}u.done?t(i):Promise.resolve(i).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise(function(o,s){var a=e.apply(t,n);function u(e){r(a,o,s,u,i,"next",e)}function i(e){r(a,o,s,u,i,"throw",e)}u(void 0)})}}var s=function(){var r=o(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:e.dom.isCompany.addEventListener("change",function(t){!0===isCompany.checked?(e.dom.checkboxField.insertAdjacentHTML("afterend",(0,e.createElement)()),e.dom.companyName=document.querySelector("#company-name")):(document.querySelector(".log-sign__box--company").remove(),delete e.dom.companyName)}),signupBtn.addEventListener("click",function(){var r=o(regeneratorRuntime.mark(function r(o){var s,a,u;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return o.preventDefault(),e.dom.signupBtn.textContent="Loading...",s=void 0,!0===isCompany.checked&&(s=e.dom.companyName.value),a={firstName:e.dom.firstName.value,lastName:e.dom.lastName.value,email:e.dom.email.value,password:e.dom.password.value,confirmPassword:e.dom.confirmPassword.value,isCompany:e.dom.isCompany.checked,companyName:s},r.next=7,(0,t.postFetchRequest)("api/v1/users/signup",a);case 7:u=r.sent,console.log(u),"fail"===u.status||"error"===u.status?((0,e.resetPasswordInputAndButtonText)(),(0,n.showAlertMessages)(u.status,u.message,"body",4,"")):"success"===u.status&&((0,e.blockFields)(),(0,n.showAlertMessages)(u.status,"Account created successfully! You can login now...","body",10,""));case 10:case"end":return r.stop()}},r)}));return function(e){return r.apply(this,arguments)}}());case 2:case"end":return r.stop()}},r)}));return function(){return r.apply(this,arguments)}}();exports.signupModule=s;
},{"./../views/signupView.js":"UQod","./../utils/fetchRequests.js":"edb1","./../utils/helpFunctions.js":"t1Vd"}],"FIRo":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetPasswordModule=exports.forgotPasswordModule=void 0;var e=require("../utils/fetchRequests.js"),t=require("../utils/helpFunctions.js");function s(e,t,s,r,n,o,a){try{var u=e[o](a),d=u.value}catch(i){return void s(i)}u.done?t(d):Promise.resolve(d).then(r,n)}function r(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function u(e){s(a,n,o,u,d,"next",e)}function d(e){s(a,n,o,u,d,"throw",e)}u(void 0)})}}var n=function(){var s={resetPasswordBtn:document.getElementById("reset-btn"),emailInput:document.getElementById("email")};s.resetPasswordBtn.addEventListener("click",function(){var n=r(regeneratorRuntime.mark(function r(n){var o,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),s.resetPasswordBtn.textContent="Loading...",o={email:s.emailInput.value},r.next=5,(0,e.postFetchRequest)("api/v1/users/forgot-password",o);case 5:"success"===(a=r.sent).status?((0,t.showAlertMessages)(a.status,"Success! Check your email account in order to reset your password","body",5,""),s.emailInput.value="",s.emailInput.disabled=!0):(0,t.showAlertMessages)(a.status,a.message,"body",5,""),s.resetPasswordBtn.textContent="Reset Password";case 8:case"end":return r.stop()}},r)}));return function(e){return n.apply(this,arguments)}}())};exports.forgotPasswordModule=n;var o=function(){var s={password:document.getElementById("password"),confirmPassword:document.getElementById("confirmPassword"),resetPasswordBtn:document.getElementById("reset-btn")};s.resetPasswordBtn.addEventListener("click",function(){var n=r(regeneratorRuntime.mark(function r(n){var o,a,u;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),s.resetPasswordBtn.textContent="Loading...",o={password:s.password.value,confirmPassword:s.confirmPassword.value},a=s.resetPasswordBtn.dataset.token,console.log(o),r.next=7,(0,e.postFetchRequest)("api/v1/users/reset-password/".concat(a),o);case 7:"success"===(u=r.sent).status?((0,t.showAlertMessages)(u.status,u.message,"body",5,"/login"),s.emailInput.value="",s.emailInput.disabled=!0):(0,t.showAlertMessages)(u.status,u.message,"body",5,""),s.resetPasswordBtn.textContent="Reset Password";case 10:case"end":return r.stop()}},r)}));return function(e){return n.apply(this,arguments)}}())};exports.resetPasswordModule=o;
},{"../utils/fetchRequests.js":"edb1","../utils/helpFunctions.js":"t1Vd"}],"iG5w":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.closePopupCloseIcon=exports.closePopupWhenClickOutside=exports.renderPopup=exports.renderNewDetails=exports.showLoadingImage=exports.showDropDownList=exports.removeActiveClassSelectCarDropDownAndArrow=exports.dom=exports.initDom=void 0;var e=function(){o.overviewHeading=document.querySelector(".overview__heading"),o.selectCarDropDownBtn=document.querySelector(".overview__drop-down"),o.popupSelectCar=document.querySelector(".popup-select-car"),o.registerNo=document.querySelector(".overview__register-no"),o.vin=document.querySelector(".overview__vin"),o.carName=document.querySelector(".overview__heading"),o.dropDownSelectCarItems=document.querySelectorAll(".popup-select-car__item"),o.detailsContainer=document.querySelector(".details"),o.overviewBar=document.querySelector(".overview"),o.percentValuesElements=document.querySelectorAll(".percent-values"),o.viewMore=document.querySelectorAll(".btn-details")};exports.initDom=e;var o={};exports.dom=o;var r=function(){o.popupSelectCar.classList.remove("popup-select-car--active"),o.selectCarDropDownBtn.classList.remove("overview__drop-down--active")};exports.removeActiveClassSelectCarDropDownAndArrow=r;var t=function(e){e.preventDefault(),o.popupSelectCar.classList.contains("popup-select-car--active")?r():(o.popupSelectCar.classList.add("popup-select-car--active"),o.selectCarDropDownBtn.classList.add("overview__drop-down--active"))};exports.showDropDownList=t;var n=function(){document.querySelector(".details__list").innerHTML='<div style="grid-column: 1 / 3; text-align: center;"><img src="./../../img/loading.gif" alt="loading img"/></div>'};exports.showLoadingImage=n;var c=function(e){o.overviewBar.innerHTML=e.overviewBar,o.detailsContainer.innerHTML=e.detailsList};exports.renderNewDetails=c;var s=function(e){document.querySelector(".content").insertAdjacentHTML("afterbegin",e.popup)};exports.renderPopup=s;var i=function(e){e.target.classList.contains("popup-details")&&document.querySelector(".popup-details").remove()};exports.closePopupWhenClickOutside=i;var p=function(e){document.querySelector(".popup-details").remove()};exports.closePopupCloseIcon=p;
},{}],"V3Pj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.overviewModule=void 0;var e=require("./../views/overviewView.js"),t=require("../utils/helpFunctions.js"),r=require("../utils/fetchRequests.js");function n(e,t,r,n,o,s,c){try{var a=e[s](c),i=a.value}catch(u){return void r(u)}a.done?t(i):Promise.resolve(i).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise(function(o,s){var c=e.apply(t,r);function a(e){n(c,o,s,a,i,"next",e)}function i(e){n(c,o,s,a,i,"throw",e)}a(void 0)})}}var s=function n(){(0,e.initDom)();var s=document.documentElement;function c(e){return a.apply(this,arguments)}function a(){return(a=o(regeneratorRuntime.mark(function t(n){var o,s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.dom.registerNo.childNodes[2].textContent.trim(),t.next=3,(0,r.getFetchRequests)("api/v1/cars/get-popup/".concat(o,"/").concat(n.target.id));case 3:s=t.sent,console.log(s),(0,e.renderPopup)(s),document.querySelector(".popup-details").addEventListener("click",e.closePopupWhenClickOutside),document.querySelector(".popup-details__close").addEventListener("click",e.closePopupCloseIcon),document.getElementById("edit-".concat(n.target.id)).addEventListener("click",i);case 10:case"end":return t.stop()}},t)}))).apply(this,arguments)}function i(e){return u.apply(this,arguments)}function u(){return(u=o(regeneratorRuntime.mark(function n(o){var s,c,a,i,u;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return s=e.dom.registerNo.childNodes[2].textContent.trim(),c=document.getElementById("validFrom"),a=document.getElementById("validTo"),i={data:{validFrom:c.value,validTo:a.value}},n.next=6,(0,r.patchFetchRequest)("api/v1/cars/update-my-car/".concat(s,"/").concat(o.target.id.split("-")[1]),i);case 6:"fail"===(u=n.sent).status||"error"===u.status?(0,t.showAlertMessages)(u.status,u.message,"body",4,""):"success"===u.status&&(0,t.showAlertMessages)(u.status,"Data update successfully","body",2,"reload");case 8:case"end":return n.stop()}},n)}))).apply(this,arguments)}e.dom.percentValuesElements=e.dom.percentValuesElements.forEach(function(e){s.style.setProperty("--progress-".concat(e.id.split("-")[1]),e.textContent)}),[e.dom.overviewHeading,e.dom.selectCarDropDownBtn].forEach(function(t){t.addEventListener("click",e.showDropDownList)}),window.addEventListener("click",function(t){if(e.dom.popupSelectCar.classList.contains("popup-select-car--active")){var r=!0;["overview__select-car","overview__heading","overview__drop-down","popup-select-car","popup-select-car__item"].forEach(function(e){t.target.classList.contains(e)&&(r=!1)}),!0===r&&(0,e.removeActiveClassSelectCarDropDownAndArrow)()}}),e.dom.dropDownSelectCarItems.forEach(function(t){t.addEventListener("click",function(){var t=o(regeneratorRuntime.mark(function t(o){var s,c;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=o.target.childNodes[0].textContent,(0,e.showLoadingImage)(),(0,e.removeActiveClassSelectCarDropDownAndArrow)(),t.next=5,(0,r.getFetchRequests)("api/v1/cars/find-my-car/".concat(s));case 5:"success"===(c=t.sent).status?((0,e.renderNewDetails)(c),(0,e.initDom)(),n()):window.location.reload();case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}())}),e.dom.viewMore.forEach(function(e){e.addEventListener("click",c)})};exports.overviewModule=s;
},{"./../views/overviewView.js":"iG5w","../utils/helpFunctions.js":"t1Vd","../utils/fetchRequests.js":"edb1"}],"rjPV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.headerModel=void 0;var e=require("./../utils/helpFunctions.js"),t=require("./../utils/fetchRequests.js");function r(e,t,r,o,n,a,s){try{var i=e[a](s),d=i.value}catch(c){return void r(c)}i.done?t(d):Promise.resolve(d).then(o,n)}function o(e){return function(){var t=this,o=arguments;return new Promise(function(n,a){var s=e.apply(t,o);function i(e){r(s,n,a,i,d,"next",e)}function d(e){r(s,n,a,i,d,"throw",e)}i(void 0)})}}var n=function(){var r={headerUser:document.querySelector(".header__user"),headerDropDown:document.querySelector(".header__drop-down"),logOutBtn:document.getElementById("logout"),headerNotifications:document.querySelector(".header__notification"),headerNotDrop:document.querySelector(".header__notification-drop")};r.headerUser.addEventListener("click",function(e){r.headerDropDown.classList.contains("header__drop-down--active")?r.headerDropDown.classList.remove("header__drop-down--active"):r.headerDropDown.classList.add("header__drop-down--active")}),r.headerNotifications.addEventListener("click",function(e){r.headerNotDrop.classList.contains("header__notification-drop--active")?r.headerNotDrop.classList.remove("header__notification-drop--active"):r.headerNotDrop.classList.add("header__notification-drop--active")}),r.logOutBtn.addEventListener("click",function(){var n=o(regeneratorRuntime.mark(function o(n){var a;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return n.preventDefault(),r.headerDropDown.classList.remove("header__drop-down--active"),o.next=4,(0,t.getFetchRequests)("api/v1/users/logout");case 4:"fail"===(a=o.sent).status||"error"===a.status?(0,e.showAlertMessages)(a.status,a.message,"body",5,""):"success"===a.status&&(0,e.showAlertMessages)(a.status,a.message,"body",1.5,"reload");case 6:case"end":return o.stop()}},o)}));return function(e){return n.apply(this,arguments)}}())};exports.headerModel=n;
},{"./../utils/helpFunctions.js":"t1Vd","./../utils/fetchRequests.js":"edb1"}],"ssPg":[function(require,module,exports) {
"use strict";function e(e,t,o,n,r,s,i){try{var a=e[s](i),d=a.value}catch(c){return void o(c)}a.done?t(d):Promise.resolve(d).then(n,r)}function t(t){return function(){var o=this,n=arguments;return new Promise(function(r,s){var i=t.apply(o,n);function a(t){e(i,r,s,a,d,"next",t)}function d(t){e(i,r,s,a,d,"throw",t)}a(void 0)})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearInputsAndSetButtonName=exports.renderProfileSettings=exports.removeActiveClassProfileNav=exports.showLoadingImage=exports.domPasswordSecurity=exports.loadDOMpasswordSecurity=exports.domEditProfile=exports.loadDOMeditProfile=exports.domNavBar=void 0;var o={navBarBtns:document.querySelectorAll(".profile-nav__link"),profileSettingsContainer:document.querySelector(".profile-settings"),navBarArrowIcons:document.querySelectorAll(".profile-nav__icon2")};exports.domNavBar=o;var n=function(){r.firstName=document.getElementById("first-name"),r.lastName=document.getElementById("last-name"),r.email=document.getElementById("email"),r.phone=document.getElementById("phone"),r.address=document.getElementById("address"),r.city=document.getElementById("city"),r.state=document.getElementById("state"),r.zipCode=document.getElementById("zip-code"),r.country=document.getElementById("country"),r.saveBtn=document.querySelector(".btn-save"),r.file=document.getElementById("file"),r.changeFileBtn=document.querySelector(".profile-settings__icon-small"),r.userPhotoElement=document.querySelector(".profile-settings__img")};exports.loadDOMeditProfile=n;var r={};exports.domEditProfile=r;var s=function(){i.oldPassword=document.getElementById("old-password"),i.password=document.getElementById("new-password"),i.confirmPassword=document.getElementById("confirm-password"),i.btnUpdate=document.querySelector(".btn-save__change-pass")};exports.loadDOMpasswordSecurity=s;var i={};exports.domPasswordSecurity=i;var a=function(){o.profileSettingsContainer.innerHTML='<div class="profile-settings__loading"><img src="img/loading.gif" alt="loading img" class="profile-settings__load-img"/></div>'};exports.showLoadingImage=a;var d=function(){o.navBarBtns.forEach(function(e){e.classList.contains("profile-nav__link--active")&&e.classList.remove("profile-nav__link--active")}),o.navBarArrowIcons.forEach(function(e){e.classList.contains("profile-nav__icon2--active")&&e.classList.remove("profile-nav__icon2--active")})};exports.removeActiveClassProfileNav=d;var c=function(){var e=t(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.classList.add("profile-nav__link--active"),t.childNodes[1].classList.add("profile-nav__icon2--active"),o.profileSettingsContainer.innerHTML=n;case 3:case"end":return e.stop()}},e)}));return function(t,o){return e.apply(this,arguments)}}();exports.renderProfileSettings=c;var l=function(){i.btnUpdate.textContent="Update password",i.oldPassword.value="",i.password.value="",i.confirmPassword.value=""};exports.clearInputsAndSetButtonName=l;
},{}],"lciG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.accountSettingsModule=void 0;var e=require("./../views/accountView.js"),t=require("../utils/helpFunctions.js"),s=require("../utils/fetchRequests.js");function r(e,t,s,r,n,o,a){try{var i=e[o](a),u=i.value}catch(c){return void s(c)}i.done?t(u):Promise.resolve(u).then(r,n)}function n(e){return function(){var t=this,s=arguments;return new Promise(function(n,o){var a=e.apply(t,s);function i(e){r(a,n,o,i,u,"next",e)}function u(e){r(a,n,o,i,u,"throw",e)}i(void 0)})}}var o=function(){function r(){return(r=n(regeneratorRuntime.mark(function r(n){var o,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return(o=new FormData).append("file",e.domEditProfile.file.files[0]),r.next=4,(0,s.postImageRequest)("api/v1/users/upload-my-photo",o);case 4:a=r.sent,e.domEditProfile.userPhotoElement.src=a.photo,document.querySelector(".header__user-photo").src=a.photo,"fail"===a.status||"error"===a.status?(0,t.showAlertMessages)(a.status,a.message,".content-account",4,""):"success"===a.status&&(0,t.showAlertMessages)(a.status,"Photo successfully uploaded",".content-account",4,"");case 8:case"end":return r.stop()}},r)}))).apply(this,arguments)}function o(){return(o=n(regeneratorRuntime.mark(function r(n){var o,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),e.domEditProfile.saveBtn.textContent="Loading...",o={firstName:e.domEditProfile.firstName.value,lastName:e.domEditProfile.lastName.value,email:e.domEditProfile.email.value,phone:e.domEditProfile.phone.value,address:e.domEditProfile.address.value,city:e.domEditProfile.city.value,state:e.domEditProfile.state.value,zipCode:e.domEditProfile.zipCode.value,country:e.domEditProfile.country.value},r.next=5,(0,s.patchFetchRequest)("api/v1/users/update-me",o);case 5:"fail"===(a=r.sent).status||"error"===a.status?((0,t.showAlertMessages)(a.status,a.message,".content-account",4,""),e.domEditProfile.saveBtn.textContent="Save"):"success"===a.status&&((0,t.showAlertMessages)(a.status,"Account update successfully",".content-account",3,""),e.domEditProfile.saveBtn.textContent="Save");case 7:case"end":return r.stop()}},r)}))).apply(this,arguments)}(0,e.loadDOMeditProfile)(),e.domEditProfile.changeFileBtn.addEventListener("click",function(){e.domEditProfile.file.click()}),e.domEditProfile.file.addEventListener("change",function(e){return r.apply(this,arguments)}),e.domEditProfile.saveBtn.addEventListener("click",function(e){return o.apply(this,arguments)})},a=function(){function r(){return(r=n(regeneratorRuntime.mark(function r(n){var o,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),e.domPasswordSecurity.btnUpdate.textContent="Loading...",o={oldPassword:e.domPasswordSecurity.oldPassword.value,password:e.domPasswordSecurity.password.value,confirmPassword:e.domPasswordSecurity.confirmPassword.value},r.next=5,(0,s.patchFetchRequest)("api/v1/users/update-password",o);case 5:"fail"===(a=r.sent).status||"error"===a.status?(0,t.showAlertMessages)(a.status,a.message,".content-account",4,""):"success"===a.status&&(0,t.showAlertMessages)(a.status,"Password update successfully",".content-account",2,"reload"),(0,e.clearInputsAndSetButtonName)();case 8:case"end":return r.stop()}},r)}))).apply(this,arguments)}(0,e.loadDOMpasswordSecurity)(),e.domPasswordSecurity.btnUpdate.addEventListener("click",function(e){return r.apply(this,arguments)})},i=function(){o(),e.domNavBar.navBarBtns.forEach(function(t){t.addEventListener("click",function(){var r=n(regeneratorRuntime.mark(function r(n){var i;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),(0,e.showLoadingImage)(),(0,e.removeActiveClassProfileNav)(),r.next=5,(0,s.getFetchRequests)("subpage/".concat(t.id));case 5:i=r.sent,(0,e.renderProfileSettings)(t,i.file),"edit-profile"===t.id&&o(),"password-security"===t.id&&a();case 9:case"end":return r.stop()}},r)}));return function(e){return r.apply(this,arguments)}}())})};exports.accountSettingsModule=i;
},{"./../views/accountView.js":"ssPg","../utils/helpFunctions.js":"t1Vd","../utils/fetchRequests.js":"edb1"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./models/homeModule.js"),o=require("./models/loginModule.js"),s=require("./models/signupModule.js"),r=require("./models/forgotResetPasswordModel.js"),d=require("./models/overviewModule.js"),a=require("./models/headerModel.js"),l=require("./models/accountModule.js");switch(console.log(window),window.location.pathname){case"/":(0,e.homeModule)();break;case"/login":(0,o.loginModule)();break;case"/signup":(0,s.signupModule)();break;case"/forgot-password":(0,r.forgotPasswordModule)();break;case"/overview":(0,a.headerModel)(),(0,d.overviewModule)();break;case"/account-info":(0,a.headerModel)(),(0,l.accountSettingsModule)();break;default:window.location.pathname.startsWith("/reset-password/")&&(0,r.resetPasswordModule)()}
},{"./models/homeModule.js":"NRVB","./models/loginModule.js":"pRCI","./models/signupModule.js":"R9az","./models/forgotResetPasswordModel.js":"FIRo","./models/overviewModule.js":"V3Pj","./models/headerModel.js":"rjPV","./models/accountModule.js":"lciG"}]},{},["Focm"], null)
//# sourceMappingURL=/bundle.js.map