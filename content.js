(() => {
    console.log('content.js loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message received in content.js: ', message);
        console.log('sender: ', sender);


        if(message.message === 'ON_YOUTUBE') {
            console.log('we are on youtube in content.js', message);
        }
        // sendResponse({ message: 'this is response from content.js' });
    });

    // chrome.runtime.sendMessage({ message: 'sendMessage from content.js' });

    // setTimeout(() => {
    //     chrome.runtime.sendMessage({ message: 'sendMessage from content.js 2' });
    // }, 2000);

    // chrome.storage.local.get(null, (items) => {
    //     console.log('items: ', items);
    // });

    // function makeDevSpace() {
    //     const devSpaceDiv = document.createElement('div');
    //     Object.assign(devSpaceDiv.style, {
    //         position: 'fixed',
    //         bottom: '0',
    //         left: '0',
    //         width: '100%',
    //         background: 'gray',
    //         color: 'black',
    //         fontSize: '20px',
    //         zIndex: '999999',
    //         padding: '8px'
    //     });

    //     document.body.appendChild(devSpaceDiv);

    //     const bookmarkBtn = document.createElement('img');
    //     bookmarkBtn.src = chrome.runtime.getURL('assets/gear.png');
    //     bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
    //     bookmarkBtn.title = 'Click to bookmark current timestamp';
    //     bookmarkBtn.style.cssText = 'width: 40px; height: 40px; cursor: pointer; margin-right: 10px;';
    //     devSpaceDiv.appendChild(bookmarkBtn);
    // }

    // makeDevSpace();

    // extension logic



})();
