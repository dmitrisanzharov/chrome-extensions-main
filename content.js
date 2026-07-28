(() => {
    console.log('content.js loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message received:', message);
        console.log('sender:', sender);
        console.log('sendResponse:', sendResponse);
    });
})();
