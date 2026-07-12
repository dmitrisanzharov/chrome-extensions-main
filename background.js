chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log(tabId, changeInfo, tab);

    if(changeInfo.status === 'complete') {
        console.log('tab updated, tabInfo: ', tab);
    }
})