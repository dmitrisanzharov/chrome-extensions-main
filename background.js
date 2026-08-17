import { EXPORTED_STRING } from './constants.js';

console.log('background.js loaded');
console.log(EXPORTED_STRING);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    chrome.storage.local.set({ myVarOne: 'varOne' });








    // console.log('---------------------------------');
    // console.log('changeInfo main', changeInfo);

    if (tab.url.includes('vclock')) {
        return;
    }

    if (tab.url.includes('youtube') && changeInfo.status === 'complete') {
        console.log('you are on youtube');

        chrome.tabs.sendMessage(tabId, {
            type: 'GENERIC',
            url: 'YOUTUBE',
            text: 'omg you are on youtube'
        });
    }

    // console.log('============================');
    // console.log('tabId: ', tabId);
    // console.log('changeInfo: ', changeInfo);
    // console.log('tab', tab);

    // if (changeInfo.status === 'complete') {

    //     chrome.tabs.sendMessage(tabId, {
    //         type: 'GENERIC',
    //         text: 'from background to content.js'
    //     })

    //     console.log('message sent');

    // }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('---------------------------------');
    console.log('Message from content script:', message);
    console.log('sender', sender);
});
