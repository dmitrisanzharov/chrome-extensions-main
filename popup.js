import { EXPORTED_STRING } from './constants.js';
console.log("EXPORTED_STRING: ", EXPORTED_STRING);

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('popup.js loaded');

    let h1El = document.querySelector('h1');
    h1El.style = 'color: red'

})