import { EXPORTED_STRING } from './constants.js';

document.addEventListener('DOMContentLoaded', ()=> {
    console.log('popup.js loaded, DOM is ready');
    console.log(EXPORTED_STRING);

    document.querySelector('h1').style.color = 'red'
})