import './sass/styles.scss';

import albums from './js/albums'

const init = () => {
    const albumsEl = document.querySelector('.albums');
    albums.init(albumsEl);
}

window.onload = init;