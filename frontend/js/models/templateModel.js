import Template from './../views/templatesView.js';

const assignActiveClassNavBar = (element) => {
    setTimeout(() => {
        document.getElementById(element).classList.add('navigation__item--active');
    }, 1000);
}
const renderFunction = (...templates) => {
    templates.forEach( el => {
        el.render();
    })
}

export default async (url, userLogged) => {

    switch(url) {
        case 'overview': {
            if(userLogged) {
                const templateOverviewUserPage = new Template('overview-user-page.xml', '.container');
                renderFunction(templateOverviewUserPage);

                console.log('finish render');
                assignActiveClassNavBar('overview');
            }else {
                const templateHome = new Template('home-page.xml', '.container');
                renderFunction(templateHome);

                assignActiveClassNavBar('overview');
            }
    
            break;
        }
    
        case '#account-info': {
            if(userLogged) {
                const templateAccountPage = new Template('account-page.xml', '.container');
                renderFunction(templateAccountPage);

                assignActiveClassNavBar('account-info');
            }else {
                window.location.href = 'http://127.0.0.1:8080/#overview';
            }
            
            break;
        }
    
        case '#car-documents': {
            window.location.href = 'http://127.0.0.1:8080/#overview';
            break;
        }
    
        case '#call-assistance': {
            window.location.href = 'http://127.0.0.1:8080/#overview';
            break;
        }

        case '#service-apoinment': {
            window.location.href = 'http://127.0.0.1:8080/#overview';
            break;
        }

        case '#signup': {
            if(userLogged) {
                window.location.href = 'http://127.0.0.1:8080/#overview';
            }else {
                const templateSignUp = new Template('signup-page.xml', '.container');
                renderFunction(templateSignUp);
            }
            break;
        }

        case '#login': {
            if(userLogged) {
                window.location.href = 'http://127.0.0.1:8080/#overview';
            }else {
                const templateLogin = new Template('login-page.xml', '.container');
                renderFunction(templateLogin)
            }

            break;
        }
    
        default: {
            window.location.href = 'http://127.0.0.1:8080/#overview';
    
            break;
        }
    }
}