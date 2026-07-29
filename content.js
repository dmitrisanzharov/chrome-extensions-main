(() => {
    console.log('content.js loaded');

    // dom elements
    const developmentContainer = document.createElement('div');
    developmentContainer.id = 'developmentContainer';
    developmentContainer.style = 'position: fixed; bottom: 0; left: 0; background-color: lightgray; z-index: 9999999;';
    document.body.appendChild(developmentContainer);

    function onClick() {
        console.log('clicked');
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
            console.log("result: ", result);
            videoTimeStampObj = result || { videoId, timeStamps: [] }
            console.log("videoTimeStampObj: ", videoTimeStampObj);
        })

    });
})();
