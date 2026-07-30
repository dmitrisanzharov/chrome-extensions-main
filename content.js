(() => {
    console.log('============================');
    console.log('content.js loaded');

    // mutation observer
    function waitForElementToAppear(selector, callback) {
        const allReadyExists = document.querySelector(selector);

        if (allReadyExists) {
            callback(allReadyExists);
            return;
        }

        const observer = new MutationObserver(() => {
            const elementThatIsDueToAppear = document.querySelector(selector);

            if (elementThatIsDueToAppear) {
                observer.disconnect();
                callback(elementThatIsDueToAppear);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // messing around with dom
    const topRowStr = '#top-row ytd-menu-renderer';
    const youTubeTopRow = document.getElementById(topRowStr);

    const redSquare = document.createElement('div');
    redSquare.id = 'redSquare';
    redSquare.style = 'height: 50px; width: 50px; margin: 10px; background-color: red;';

    waitForElementToAppear(topRowStr, (element) => {
        element.appendChild(redSquare);
    });

    // dom elements
    const developmentContainer = document.createElement('div');
    developmentContainer.id = 'developmentContainer';
    developmentContainer.style = 'position: fixed; bottom: 0; left: 0; background-color: lightgray; z-index: 9999999;';
    document.body.appendChild(developmentContainer);

    function onClick() {
        console.log('============================');
        console.log('ON CLICK FUNCTION');
        // set timestamps
        const getTimeStamp = document.getElementsByClassName('video-stream')[0].currentTime;
        console.log('getTimeStamp: ', getTimeStamp);

        const keyIsVideoId = Object.keys(videoTimeStampObj)[0];

        videoTimeStampObj[keyIsVideoId].push(getTimeStamp);
        console.log('videoTimeStampObj ', videoTimeStampObj);

        // sort before pushing
        videoTimeStampObj[keyIsVideoId].sort((a, b) => a - b);

        // push into the storage
        chrome.storage.local.set(videoTimeStampObj);
    }

    const plusButton = document.createElement('button');
    plusButton.id = 'plusButton';
    plusButton.innerText = '+';
    plusButton.style = 'height: 50px; width: 50px; margin: 10px;';
    plusButton.addEventListener('click', onClick);
    developmentContainer.appendChild(plusButton);

    // video TimeStamp stuff

    let videoTimeStampsObj;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message', message);
        console.log('sender', sender);
        console.log('sendResponse', sendResponse);

        // get the videoTimeStampsObj
        if (message.status === 'FROM_BACKGROUND_VIDEO_ID') {
            const videoId = message.videoId;
            chrome.storage.local.get(videoId, (result) => {
                console.log('============================');
                console.log('MESSAGE FROM BACKGROUND.JS');
                console.log('result: ', result);
                videoTimeStampObj = result[videoId] ? result : { [videoId]: [] };
                console.log('videoTimeStampObj: ', videoTimeStampObj);
            });
        }

        // if (message.status === 'FROM_POPUP_TIMESTAMP') {
        //     console.log('============================');
        //     console.log('applied from FROM_POPUP_TIMESTAMP');
        //     console.log();
        //     document.querySelector('video').currentTime = message.timeStampForDom;
        // }
    });
})();
