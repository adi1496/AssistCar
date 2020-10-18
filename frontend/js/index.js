import '@babel/polyfill';
import {renderController} from './controllers/renderController.js';
import {showloadingPage} from './views/renderPage.js';
let pageRequest;
if(document.URL.startsWith(`${window.origin}/#`)){
    pageRequest = document.URL.replace(`${window.origin}/#`, '');
}else {
    pageRequest = 'home';
}

showloadingPage();

(async() => {
    renderController(pageRequest);
})();



window.onhashchange = (event) => {
    location.reload();
    console.log(document.URL);
}



