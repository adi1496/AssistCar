import {renderPage, showloadingPage, hideLoadingPage} from './../views/renderPage.js';
import {loadJS} from './loadJS.js';
import {renderOverviewDetails} from './../views/overviewViews.js';


export const renderController = async(url) => {
    console.log(url);
    let response = await fetch(`http://127.0.0.1:3000/api/v1/pages/${url}`, {
        credentials: 'include'
    });

    let pageRequest = await response.json();

    if(pageRequest.status === 'notLogged') {
        window.location.href = pageRequest.page;
    }else if(pageRequest.status === 'logged'){
        window.location.href = pageRequest.page;
    }

    if(document.readyState === 'complete' || document.readyState === 'interactive') {
        renderPage('.container', pageRequest.page);
        // console.log(pageRequest);
        setTimeout(() => {
            if(pageRequest.listeners === 'overview-user'){
                renderOverviewDetails(pageRequest.cars);
            }
            loadJS(url, pageRequest.listeners);
        }, 300);
        hideLoadingPage();
    }
}
