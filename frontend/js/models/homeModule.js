export const homeLoad = () => {
    const buttonDiscover = document.querySelector('.btn-details--big');

    buttonDiscover.addEventListener('click', event => {
        event.preventDefault();

        console.log('clicked');
        document.querySelector('.section-features').scrollIntoView({behavior: 'smooth'});
    })
}