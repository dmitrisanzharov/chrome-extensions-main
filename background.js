console.log('background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (tabId === 1466663465) {
        return;
    }

    console.log('============================');
    console.log('tabId: ', tabId);
    console.log('changeInfo: ', changeInfo);

    if (changeInfo.status === 'complete') {
        
        chrome.tabs.sendMessage(tabId, {
            type: 'GENERIC',
            text: 'from background to content.js'
        })

        console.log('message sent');

    }
});
