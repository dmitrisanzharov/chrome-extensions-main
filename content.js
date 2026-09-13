(() => {
    console.log('chrome.tabs', chrome.tabs);

    console.log('content.js loaded');

    const devDiv = document.createElement('div');

    devDiv.textContent = 'Hello';

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
})();
