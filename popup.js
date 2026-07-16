import { getCurrentTab } from './utils.js';
console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', async () => {

    const popupContainer = document.getElementById('popup_container');

    const mainTab = await getCurrentTab();
    // console.log("mainTab: ", mainTab);

    const urlObj = new URL(mainTab.url);

    const isYouTube = urlObj.hostname === 'www.youtube.com';

    if (isYouTube) {
        // console.log('we are on youtube');
        const videoId = urlObj.searchParams.get('v');
        // console.log('videoId: ', videoId);

        const mainDiv = document.createElement('div');
        mainDiv.innerHTML = 'mainDiv';
        popupContainer.appendChild(mainDiv);

        // display all bookmarks
        chrome.storage.local.get(null, (result) => {
            console.log('============================');
            console.log('result: ', result);

            const allVideos = result[videoId];
            const hadVideos = allVideos !== undefined;

            if (hadVideos) {
                const ul = document.createElement('ul');
                allVideos.timeStamps.forEach((timeStampObj) => {
                    const li = document.createElement('li');
                    li.textContent = timeStampObj.humanReadableTimeStamp;
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', () => {
                        chrome.tabs.sendMessage(mainTab.id, {
                            message: 'SEEK_TO_TIMESTAMP',
                            timeStampObj
                        });
                    });
                    ul.appendChild(li);
                });
                mainDiv.appendChild(ul);
            }
        });

        // button to clear everything in chrome.storage.local
        const clearAllBtn = document.createElement('button');
        clearAllBtn.textContent = 'Clear All';
        clearAllBtn.addEventListener('click', () => {
            chrome.storage.local.remove(videoId, () => {
                
                popupContainer.innerHTML = '';
                const noBookmarksMessage = document.createElement('p');
                noBookmarksMessage.textContent = 'No bookmarks yet.';
                popupContainer.appendChild(noBookmarksMessage);
            });
        });
        popupContainer.appendChild(clearAllBtn);
    }

    // end of DOMContentLoaded
});
