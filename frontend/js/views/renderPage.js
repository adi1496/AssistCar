export const renderPage = (element, page) => {
    document.querySelector(element).innerHTML = page;
}

export const showloadingPage = () => {
    // document.querySelector('.container__loading').style.zIndex = '999';
    document.querySelector('.container__loading').style.opacity = 1;
    document.querySelector('.container__loading').style.visibility = 'visible';
    document.querySelector('.container').style.visibility = 'hidden';
    document.querySelector('.container').style.opacity = 0;
}

export const hideLoadingPage = () => {
    document.querySelector('.container').style.opacity = 1;
    document.querySelector('.container__loading').style.opacity = 0;
    document.querySelector('.container').style.visibility = 'visible';
    document.querySelector('.container__loading').style.visibility = 'hidden';
}