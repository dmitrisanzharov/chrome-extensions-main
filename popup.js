import { EXPORTED_STRING } from './constants.js';
console.log('popup.js loaded');
console.log('EXPORTED_STRING: ', EXPORTED_STRING);

document.addEventListener('DOMContentLoaded', () => {
    const h1Element = document.querySelector('h1');
    h1Element.style.color = 'red';
});
