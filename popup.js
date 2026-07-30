import { EXPORTED_STRING, getCurrentTab } from './constants.js';
console.log('popup.js loaded');
console.log('EXPORTED_STRING', EXPORTED_STRING);

function onClickFn(timeStamp, tab) {
    console.log('============================');

    console.log('onClickFn');
    console.log('timeStamp: ', timeStamp);
    console.log('tab: ', tab);

    chrome.tabs.sendMessage(tab.id, {
        timeStampForDom: timeStamp,
        status: 'FROM_POPUP_TIMESTAMP'
    });
}

function noVideosHtml(){
    let el = document.getElementById('noVidsDiv');
    el.innerHTML = 'no videos found';
}

function removeStorageBtn() {
    console.log('============================');
    console.log('removeStorageBtn triggered');

    chrome.storage.local.clear(() => {
        console.log('storage is cleared');

        chrome.storage.local.get(null, (result) => {
            console.log('all storage after clear', result);
            noVideosHtml();
        });
    });
}

function removeStorageBtnForThisVideo(videoId) {
    console.log('============================');
    chrome.storage.local.remove(videoId, () => {
        console.log('storage is cleared');

        chrome.storage.local.get(null, (result) => {
            console.log('all storage after videoId removal', result);
            noVideosHtml();
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    getCurrentTab().then((tab) => {
        console.log('============================');
        console.log('GET CURRENT TAB -----------');
        console.log('tab: ', tab);

        const url = new URL(tab.url).searchParams;
        const urlObj = Object.fromEntries(url);
        const videoId = urlObj.v;
        console.log('videoId: ', videoId);

        // get all vids object
        chrome.storage.local.get(null, (allStorage) => {
            console.log('============================');
            console.log('result: ', allStorage);
            console.log('videoId', videoId);

            //handle delete ALL button
            const btnRemoveStorageBtn = document.getElementById('removeStorageBtn');
            btnRemoveStorageBtn.addEventListener('click', () => removeStorageBtn());

            // handle the delete button
            const btnRemoveStorageBtnForThisVideo = document.getElementById('removeStorageBtnForThisVideo');
            btnRemoveStorageBtnForThisVideo.addEventListener('click', () => removeStorageBtnForThisVideo(videoId));

            // handle the dom elements

            const thisVideoObjTimeStampsArr = allStorage[videoId];
            console.log('thisVideoObjTimeStampsArr: ', thisVideoObjTimeStampsArr);

            // PUT THAT INTO THE DOM
            const ulDiv = document.getElementById('myUl');
            console.log('ulDiv: ', ulDiv);

            // test li
            // const testLi = document.createElement('li');
            // testLi.innerHTML = 'test';
            // ulDiv.appendChild(testLi);

            // no bookmarks

            if (thisVideoObjTimeStampsArr.length === 0) {
                const noBookMarksLi = document.createElement('li');
                noBookMarksLi.innerHTML = 'no bookmarks';
                ulDiv.appendChild(noBookMarksLi);
            }

            // iterate and push dom element
            thisVideoObjTimeStampsArr.forEach((timeStamp) => {
                console.log('============================');
                console.log('timestamp');
                let li = document.createElement('li');
                console.log('li: ', li);
                li.innerHTML = timeStamp;
                Object.assign(li.style, {
                    margin: '10px'
                });
                // li.onclick = () => onClickFn(timeStamp, tab);

                li.addEventListener('click', () => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: (seconds) => {
                            document.querySelector('video').currentTime = seconds;
                        },
                        args: [timeStamp]
                    });
                });

                ulDiv.appendChild(li);
            });
        });
    });
});
