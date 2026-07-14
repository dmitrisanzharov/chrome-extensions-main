import { EXPORTED_STRING } from './constants.js';
import './foo.js';
console.log('EXPORTED_STRING: ', EXPORTED_STRING);
console.log('background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isTimer = tab.url.includes('https://vclock.com/');

    const isComplete = changeInfo.status === 'complete';

    if (isTimer) {
        return;
    }

    if (isComplete) {
        console.log('============================');
        console.log('tabId: ', tabId);
        console.log('changeInfo: ', changeInfo);
        console.log('tab: ', tab);

        chrome.tabs.sendMessage(tabId, { message: 'yep, worked' });


        // end of isComplete
    }

    
});

chrome.storage.local.set({ keyOne: 'valueOne', keyTwo: 'valueTwo' });


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('============================');
    console.log('message received in background.js: ', message);
    console.log('sender: ', sender);
    // sendResponse({ message: 'this is response from background.js' });
});

