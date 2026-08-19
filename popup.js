import { getCurrentTab } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('popup.js loaded, DOM is ready');

    let clearAllBtnInDom = document.getElementById('clearAllStorageBtn');
    clearAllBtnInDom.addEventListener('click', function () {
        chrome.storage.local.clear();
    });

    let seeStorageBtnInDom = document.getElementById('seeStorage');
    seeStorageBtnInDom.addEventListener('click', function () {
        chrome.storage.local.get(null, (result) => {
            console.log('all storage', result);
        });
    });

    function myFunction(time, tabIdArg) {
        console.log('function ran');

        chrome.tabs.sendMessage(tabIdArg, {
            message: 'timeStamp',
            arg: time
        });

        // chrome.scripting.executeScript({
        //     target: { tabId: tabIdArg },
        //     func: (timeStamp) => {
        //         let video = document.querySelector('video');
        //         console.log("video: ", video);

        //         video.currentTime = timeStamp;
        //     },
        //     args: [time]
        // })
    }

    getCurrentTab().then((result) => {
        console.log('result: ', result);

        const tabId = result.id;

        const href = result.url;
        console.log('href: ', href);
        const urlObj = Object.fromEntries(new URL(href).searchParams.entries());

        const videoId = urlObj.v;
        console.log('videoId: ', videoId);

        chrome.storage.local.get(videoId.toString(), (result) => {
            console.log('result: ', result);

            let stampsArr = result[videoId];
            console.log('stampsArr: ', stampsArr);

            const hasItems = stampsArr && stampsArr.length;
            console.log('hasItems: ', hasItems);

            let myUl = document.getElementById('listId');
            console.log('myUl: ', myUl);

            if (!hasItems) {
                console.log('test');
                let noItemLi = document.createElement('li');
                noItemLi.textContent = 'no items';
                myUl.appendChild(noItemLi);
            } else {
                stampsArr.forEach((time) => {
                    let liItem = document.createElement('li');
                    liItem.style = 'margin-bottom: 10px';

                    liItem.textContent = time;

                    liItem.onclick = () => {
                        myFunction(time, tabId);
                    };

                    myUl.appendChild(liItem);
                });
            }

            let deleteForCurrentVideoInDom = document.getElementById('deleteForCurrentVideo');
            deleteForCurrentVideoInDom.addEventListener('click', function () {
                chrome.storage.local.remove(videoId.toString());
                myUl.innerText = 'no items'
            });
        });
    });
});
