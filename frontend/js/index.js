// import '@babel/polyfill';
import renderTemplates from './models/templateModel.js';
import {setEventListeners} from './models/eventsListeneres.js';
import {renderPage, showloadingPage, hideLoadingPage} from './views/renderPage.js';
let pageRequest, url;
if(document.URL.startsWith('`${window.origin}/#`')){
    url = document.URL.replace(`${window.origin}/#`, '');
}else {
    url = 'overview';
}


showloadingPage();

(async() => {
    console.log(window);
    let response = await fetch(`http://127.0.0.1:3000/api/v1/pages/${url}`);
    pageRequest = await response.json();
    // pageRequest = pageRequest.page;
    console.log('request ok');

    if(document.readyState === 'complete' || document.readyState === 'interactive') {
        renderPage('.container', pageRequest.page);
        setTimeout(() => {
            setEventListeners(url, pageRequest.listeners);
        }, 100);
        hideLoadingPage();
    }
})();



window.onhashchange = () => {
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




