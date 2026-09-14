import { EXPORTED_STRING } from './constants.js';
console.log('EXPORTED_STRING: ', EXPORTED_STRING);

document.addEventListener('DOMContentLoaded', () => {
    console.log('popup.js loaded');

    let h1El = document.querySelector('h1');
    h1El.style = 'color: red';

    // add items

    const myBtn = document.getElementById('myBtn');

    myBtn.addEventListener('click', async () => {
        chrome.storage.local.set({ foo: 'foo in storage', bar: 'bar in storage' });
    });


    // delete
       const deleteBtn = document.getElementById('deleteBtn');

    deleteBtn.addEventListener('click', async () => {
        chrome.storage.local.remove('keyToDelete');
    });


});
