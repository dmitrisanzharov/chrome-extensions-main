(() => {
    // get all items
    chrome.storage.local.get(['foo', 'bar'], (result) => {
        console.log('result of storage', result);
    });

    chrome.storage.local.get(null, (result) => {
        console.log('result of ALL storage', result);
    });

    // all other
    console.log('chrome.tabs', chrome.tabs);

    console.log('content.js loaded');

    const devDiv = document.createElement('div');

    Object.assign(devDiv.style, {
        position: 'fixed',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '100px',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        zIndex: 100000
    });

    document.body.appendChild(devDiv);

    //  img

    const myImg1 = document.createElement('img');
    myImg1.src = chrome.runtime.getURL('assets/img1.png');
    myImg1.title = 'click to add';

    Object.assign(myImg1.style, {
        height: '50px',
        width: '100px'
    });

    devDiv.appendChild(myImg1);

    //  const element = document.querySelector('a[data-analytics-title="learn more - iphone duo"]');
    //  Object.assign(element.style, {
    //      border: '5px solid red'
    //  });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message received:', message);
        console.log('sender:', sender);
        console.log('sendResponse:', sendResponse);
    });

    const imgUrl = chrome.runtime.getURL('assets/sparta.png');
    console.log('imgUrl: ', imgUrl);

    // send message TO background
    console.log('sending message');
    chrome.runtime.sendMessage({ text: 'from content.js' });

    // element after 5 seconds

    let ytDiv = document.getElementById('start');

    let redSquare = document.createElement('div');

    function waitForElementToAppear(selector, callback) {
        const allReadyExists = document.querySelector(selector);
        console.log('allReadyExists: ', allReadyExists);

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

    waitForElementToAppear('#start', (element) => {
        console.log('triggered');
        Object.assign(redSquare.style, {
            height: '100px',
            width: '100px',
            backgroundColor: 'red'
        });

        element.appendChild(redSquare);
    });

    // 
})();
