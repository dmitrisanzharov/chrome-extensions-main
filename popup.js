import { getCurrentTab } from './utils.js';
console.log('popup.js loaded');

document.addEventListener('DOMContentLoaded', async () => {
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
        document.body.appendChild(mainDiv);

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
                    li.style.marginBottom = '5px';
                    li.addEventListener('click', () => {
                        chrome.scripting.executeScript({
                            target: { tabId: mainTab.id },
                            func: (seconds) => {
                                document.querySelector('video').currentTime = seconds;
                            },
                            args: [timeStampObj.currentTimeStamp],
                        });
                    });
                    ul.appendChild(li);
                });
                mainDiv.appendChild(ul);


            }
        });
    }
});
