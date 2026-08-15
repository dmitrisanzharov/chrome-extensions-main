console.log('background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === 1466662731) {
        return;
    }

    console.log('============================');
    console.log('tabId: ', tabId);
    console.log('changeInfo: ', changeInfo);

    if (changeInfo.status === 'complete') {
        console.log('tab is loaded');
    }
});
