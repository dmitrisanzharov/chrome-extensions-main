import { getCurrentTab } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('popup.js loaded, DOM is ready');


    function myFunction(time){
        console.log('function ran');



    }

    getCurrentTab().then((result) => {
        console.log('result: ', result);

        const href = result.url;
        console.log('href: ', href);
        const urlObj = Object.fromEntries(new URL(href).searchParams.entries());

        const videoId = urlObj.v;
        console.log('videoId: ', videoId);

        chrome.storage.local.get(videoId.toString(), (result) => {
            console.log('result: ', result);

            let stampsArr = result[videoId];
            console.log('stampsArr: ', stampsArr);

            let myUl = document.getElementById('listId');
            console.log('myUl: ', myUl);


            stampsArr.forEach((time) => {
                let liItem = document.createElement('li');

                liItem.textContent = time;

                liItem.onclick = () => {
                    myFunction(time);
                };

                myUl.appendChild(liItem);
            });
        });
    });
});
