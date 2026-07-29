import { EXPORTED_STRING, getCurrentTab } from './constants.js';
console.log('popup.js loaded');
console.log('EXPORTED_STRING', EXPORTED_STRING);

document.addEventListener('DOMContentLoaded', async () => {
    

    getCurrentTab().then((tab) => {
        console.log('tab: ', tab);

        const url = new URL(tab.url).searchParams;
        const urlObj = Object.fromEntries(url);
        const videoId = urlObj.v;
        console.log('videoId: ', videoId);


        // get all vids object
        chrome.storage.local.get(null, (allStorage) => {
            console.log('result: ', allStorage);
            
            
            const thisVideoObj = allStorage[videoId];
            console.log('thisVideoObj: ', thisVideoObj);
            
        });


    })



})