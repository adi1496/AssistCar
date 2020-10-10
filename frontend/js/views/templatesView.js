// const body = document.querySelector('body');

// const loadHTML = async(data) => {
//     const response = await fetch(data);
//     const element = await response.text();

//     body.innerHTML = element;
// }

// loadHTML('./container.html')
// import axios from 'axios';

export default class {
    constructor(file, containerElement) {
        this.file = `./html/${file}`;
        this.container = document.querySelector(`${containerElement}`);
    }

    async render() {
        // console.log('rendering...');
        const response = await fetch(this.file);
        const content = await response.text();
        this.container.insertAdjacentHTML('afterbegin', content);
    }
}

// export default async(userLogged) => {
//     const header = document.querySelector('.header');
//     const details = document.querySelector('.details');



//     /******** CHOOSE THE CORECT HEADER (GUEST OR LOGGED USER) *********/
//     const deliverHeader = async(isUserLogged) => {
//         if (isUserLogged) {

//             // 1st way
//             const response = await fetch('./html/header-user.xml');
//             const content = await response.text();
//             header.insertAdjacentHTML('afterbegin', content);

//             // 2nd way
//             // const response = await axios('./container.xml');
//             // // console.log(response.data);
//             // container.insertAdjacentHTML('afterbegin', response.data);
//         }
//     }

//     const deliverDetails = async(isUserLogged) => {
//         if(isUserLogged) {
//             const response = await fetch('./html/details-user.xml');
//             const content = await response.text();
//             details.insertAdjacentHTML('afterbegin', content);
//         }
//     }

//     const overview = (userLogged) => {
//         deliverHeader(userLogged);
//         deliverDetails(userLogged);
//     }
    
//     overview(userLogged);

// };


