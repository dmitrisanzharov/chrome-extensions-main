(() => {
    console.log('content.js loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message received in content.js: ', message);
        console.log('sender: ', sender);
        sendResponse({ message: 'this is response from content.js' });
    });
})();
