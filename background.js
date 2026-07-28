console.log('background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isOnTimer = tab.url.includes('https://vclock.com/');

    if (isOnTimer) {
        // console.log('on timer skipped');
        return;
    }

    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
        // console.log('============================');
        // console.log('tabId:', tabId);
        // console.log('changeInfo:', changeInfo);
        // console.log('tab:', tab);

        // console.log('YouTube tab opened/loaded:', tab.url);

        console.log('tabs', chrome.tabs);

        chrome.tabs.sendMessage(tabId, {
            message: 'omg you opened youtube'
        });
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('============================');
        console.log('message received:', message);
        console.log('sender:', sender);
        console.log('sendResponse:', sendResponse);
    });
});
