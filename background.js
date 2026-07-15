console.log('background.js loaded');


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isTimer = tab.url.includes('https://vclock.com/');
    const isYoutube = tab.url.includes('youtube.com/watch');

    const isComplete = changeInfo.status === 'complete';

    if (isTimer) {
        return;
    }

    if (isComplete && isYoutube) {
        console.log('============================');
        console.log('tabId: ', tabId);
        console.log('changeInfo: ', changeInfo);
        console.log('tab: ', tab);


        const urlParamsObj = Object.fromEntries(new URL(tab.url).searchParams);
        console.log("urlParamsObj: ", urlParamsObj);

        chrome.tabs.sendMessage(tabId, { message: 'ON_YOUTUBE_VIDEO', tabId, tab, urlParamsObj });


        // end of isComplete
    }

    
});

// chrome.storage.local.set({ keyOne: 'valueOne', keyTwo: 'valueTwo' });


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('============================');
//     console.log('message received in background.js: ', message);
//     console.log('sender: ', sender);
//     // sendResponse({ message: 'this is response from background.js' });
// });

