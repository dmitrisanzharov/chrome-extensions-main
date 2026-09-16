import { EXPORTED_STRING } from './constants.js';
import { getCurrentTab } from './helper/getCurrentTab.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('popup.js loaded');

    let currentTab = await getCurrentTab();
    console.log('currentTab: ', currentTab);

    if (Object.keys(currentTab).length && currentTab.url.includes('youtube.com')) {
        console.log('on youtube');

        const url = new URL(currentTab.url);
        const videoId = url.searchParams.get('v');
        console.log('videoId: ', videoId);

        // BUTTONS

        const mainUl = document.getElementById('mainUl');
        console.log('mainUl: ', mainUl);

        const clearAllBtnConst = document.getElementById('clearAllBtn');
        clearAllBtnConst.addEventListener('click', () => {
            chrome.storage.local.remove(videoId);
            mainUl.innerHTML = 'no bookmarks';
        });

        const clearStorageConst = document.getElementById('clearStorage');
        clearStorageConst.addEventListener('click', () => {
            chrome.storage.local.clear();
            mainUl.innerHTML = 'no bookmarks';
        });

        // STUFF FOR UL AND LIST

        // check if video has bookmarks

        chrome.storage.local.get(videoId, (resultOfStorage) => {
            console.log('resultOfStorage: ', resultOfStorage);

            const prevExists = Object.keys(resultOfStorage).length;
            console.log('prevExists: ', prevExists);

            if (!prevExists) {
                mainUl.innerHTML = 'no bookmarks';
            } else {
                let tsArray = resultOfStorage[videoId];

                tsArray.forEach((timestamp) => {
                    const li = document.createElement('li');

                    li.textContent = timestamp;
                    Object.assign(li.style, {
                        marginTop: '10px',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    });

                    li.addEventListener('click', () => {
                        console.log('Clicked timestamp:', timestamp);

                        // move the video timestamp

                        // chrome.scripting.executeScript({
                        //     target: { tabId: currentTab.id},
                        //     func: (secArg) => {
                        //         document.querySelector('video').currentTime = secArg
                        //     }  ,
                        //     args: [timestamp]
                        // });

                        // Do whatever you want here

                        console.log('message ready');

                        chrome.tabs.sendMessage(currentTab.id, { type: 'TIMESTAMP', timestamp: timestamp });

                        console.log('message sent');
                    });

                    mainUl.appendChild(li);
                });
            }
        });

        // on youtube end
    }
});
