import '@babel/polyfill';

import Albums from './Albums';
import Album from './Album';
import spriteMatrix from './sprite-matrix';

import leftSprites from './left-sprites';
import rightSprites from './right-sprites';

const albumLeftElement = document.querySelector('.albums-left');
const albumRightElement = document.querySelector('.albums-right');

const leftAlbumsCb = (album) => new Album(album, albumLeftElement);
const rightAlbumsCb = (album) => new Album(album, albumRightElement);

const albumItems = [...leftSprites.map(leftAlbumsCb), ...rightSprites.map(rightAlbumsCb)];

export default new Albums(spriteMatrix, albumItems);
