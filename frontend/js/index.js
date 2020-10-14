// import '@babel/polyfill';
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



// const initAplication = (url, userLogged) => {
//     eventsListeneres(url, userLogged);
// }




// document.onreadystatechange = async function() {
//     console.log('salve');
//     let userLogged = false;
//     if(document.readyState === 'interactive') {
//         // await renderTemplates(url, userLogged);
//         document.querySelector('.container').innerHTML = pageRequest;
//     }




//     if(document.readyState === 'complete') {
//         document.querySelector('.container__loading').style.zIndex = '999';
//         document.querySelector('.container__loading').style.opacity = 1;
//         document.querySelector('.container__loading').style.visibility = 'visible';
//         document.querySelector('.container').style.visibility = 'hidden';
//         document.querySelector('.container').style.opacity = 0;
//         setTimeout(() => {
//             document.querySelector('.container').style.opacity = 1;
//             document.querySelector('.container__loading').style.opacity = 0;
//             document.querySelector('.container').style.visibility = 'visible';
//             document.querySelector('.container__loading').style.visibility = 'hidden';
//             initAplication(url, userLogged);
//         }, 500);
//     }
// }




