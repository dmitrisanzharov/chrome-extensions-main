
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') return;
    chrome.tabs.sendMessage(tabId, { message: 'sendMessage from background.js' }, (response) => {
        console.log('this is response from content script: ', response);
    });
});

// let a = chrome.runtime.getURL('assets/gear.png');

// console.log(a);