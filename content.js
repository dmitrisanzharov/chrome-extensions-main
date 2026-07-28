(() => {
    console.log('content.js loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message received:', message);
        console.log('sender:', sender);
        console.log('sendResponse:', sendResponse);
    });

    chrome.runtime.sendMessage({
        from: 'content.js',
        message: 'content.js sent you message 1'
    })

    const url = chrome.runtime.getURL('assets/freeIcon.png');
    console.log('url', url);


    const tabs = chrome.tabs;
    console.log('tabs', tabs);

})();
