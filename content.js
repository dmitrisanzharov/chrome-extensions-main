(() => {
    console.log('content.js loaded');

    let videoId = null;

    function removeDuplicates(arr) {
    return [
        ...new Map(
            arr.map(item => [
                `${item.currentTimeStamp}-${item.videoId}`,
                item
            ])
        ).values()
    ];
}

    function formatTime(currentTimeStampInSeconds) {
        return new Date(currentTimeStampInSeconds * 1000).toISOString().slice(11, 19);
    }

    function waitForElement(selector, callback) {
        const existing = document.querySelector(selector);

        if (existing) {
            callback(existing);
            return;
        }

        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);

            if (element) {
                observer.disconnect();
                callback(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function handleClick() {
        console.log('clicked');

        const currentTimeStamp = document.getElementsByClassName('video-stream')[0].currentTime;
        console.log('currentTimeStamp: ', currentTimeStamp);

        const videoObj = {
            currentTimeStamp,
            humanReadableTimeStamp: formatTime(currentTimeStamp),
            videoId
        };

        console.log('videoObj: ', videoObj);

        // check bookmarks
        chrome.storage.local.get(null, (result) => {
            const isOldVideo = videoId in result;

            const videoObject = result[videoId];
            console.log('videoObject: ', videoObject);

            if (isOldVideo) {
                videoObject.timeStamps.push(videoObj);

                videoObject.timeStamps = removeDuplicates(videoObject.timeStamps);

                chrome.storage.local.set({
                    [videoId]: videoObject
                });

            } else {
                chrome.storage.local.set({
                    [videoId]: {
                        timeStamps: [videoObj]
                    }
                });
            }

            // check what is in the object after all mutations
            chrome.storage.local.get(null, (result) => {
                console.log('============================');
                console.log('final result: ', result);
            });
        });
    }

    function makeDevSpace() {
        const devSpaceDiv = document.createElement('div');
        Object.assign(devSpaceDiv.style, {
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '20%',
            background: 'gray',
            color: 'black',
            fontSize: '20px',
            zIndex: '999999',
            padding: '8px'
        });

        document.body.appendChild(devSpaceDiv);

        const bookmarkBtn = document.createElement('img');
        bookmarkBtn.src = chrome.runtime.getURL('assets/gear.png');
        bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
        bookmarkBtn.title = 'Click to bookmark current timestamp';
        bookmarkBtn.style.cssText = 'width: 40px; height: 40px; cursor: pointer; margin-right: 10px;';
        bookmarkBtn.addEventListener('click', handleClick);
        devSpaceDiv.appendChild(bookmarkBtn);
    }

    makeDevSpace();

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // console.log('============================');
        // console.log('message received in content.js: ', message);
        // console.log('sender: ', sender);

        if (message.message === 'ON_YOUTUBE_VIDEO') {
            console.log('we are on youtube in content.js', message);

            videoId = message.urlParamsObj.v;
        }
    });

    // DOM manipulation practice

    // let test = document.getElementsByClassName('ytp-left-controls')[0];
    // console.log('test', test);

    // const redSquare = document.createElement('div');
    // Object.assign(redSquare.style, {
    //     width: '110px',
    //     height: '110px',
    //     backgroundColor: 'red',
    //     marginLeft: '10px'
    // });

    // setTimeout(() => {
    //     const container = document.querySelector('#top-row ytd-menu-renderer');
    //     console.log('container: ', container);
    //     container.appendChild(redSquare);
    // }, 5000);

    // waitForElement('#top-row ytd-menu-renderer', (container) => {
    //     console.log('Found!', container);

    //     const redSquare = document.createElement('div');
    //     redSquare.style.width = '20px';
    //     redSquare.style.height = '20px';
    //     redSquare.style.background = 'red';

    //     container.appendChild(redSquare);
    // });
})();
