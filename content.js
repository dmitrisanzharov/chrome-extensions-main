(() => {
    console.log('content.js loaded');

    // mutation observer
    function waitForElementToAppear(selector, callback) {
        const allReadyExists = document.querySelector(selector);
        console.log('allReadyExists: ', allReadyExists);

        if (allReadyExists) {
            callback(allReadyExists);
            return;
        }

        const observer = new MutationObserver(() => {
            const elementThatIsDueToAppear = document.querySelector(selector);
            console.log('elementThatIsDueToAppear: ', elementThatIsDueToAppear);

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
    console.log('youTubeTopRow: ', youTubeTopRow);

    const redSquare = document.createElement('div');
    redSquare.id = 'redSquare';
    redSquare.style = 'height: 50px; width: 50px; margin: 10px; background-color: red;';

    waitForElementToAppear(topRowStr, (element) => {
        console.log('finally it appeared');
        element.appendChild(redSquare);
    });

    // dom elements
    const developmentContainer = document.createElement('div');
    developmentContainer.id = 'developmentContainer';
    developmentContainer.style = 'position: fixed; bottom: 0; left: 0; background-color: lightgray; z-index: 9999999;';
    document.body.appendChild(developmentContainer);

    function onClick() {
        console.log('clicked');
        // set timestamps
        const getTimeStamp = document.getElementsByClassName('video-stream')[0].currentTime;
        console.log('getTimeStamp: ', getTimeStamp);

        videoTimeStampObj.timeStamps.push(getTimeStamp);
        console.log('videoTimeStampObj.timeStamps: ', videoTimeStampObj.timeStamps);


        // NOTE: object here is wrong... needs to be: vidId as KEY and then array of timeStamps as VALUE
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
        // console.log('============================');
        // console.log('message', message);
        // console.log('sender', sender);
        // console.log('sendResponse', sendResponse);

        // get the videoTimeStampsObj
        const videoId = message.videoId;
        chrome.storage.local.get(videoId, (result) => {
            console.log('result: ', result);
            videoTimeStampObj = result[videoId] ? result : { [videoId]: videoId, timeStamps: [] };
            console.log('videoTimeStampObj: ', videoTimeStampObj);
        });
    });
})();
