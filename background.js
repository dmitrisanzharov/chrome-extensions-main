import './random_file.js';
import { EXPORTED_STRING } from './constants.js';
import { convertUrlToObject } from './helper/convertUrlToObject.js';
// console.log("EXPORTED_STRING: ", EXPORTED_STRING);

console.log('background.js loaded');

// chrome.action.setBadgeText({ text: "3"})

// console.log('chrome.actions', chrome.action.randomKey);

// console.log('chrome.tabs', chrome.tabs);

function allowedUrls(tabIdUrl) {
    const allowedDomains = ['apple.com', 'youtube.com', 'independent.ie'];

    return allowedDomains.some((domain) => tabIdUrl.includes(domain));
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isAllowed = allowedUrls(tab.url);

    if (!isAllowed) {
        return;
    }

    // console.log('============================');
    // console.log('tabId', tabId);
    // console.log('changeInfo', changeInfo);
    // console.log('tab', tab);

    // console.log('---------------------------------');

    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
        console.log('message ready to be sent');

        let urlObject = convertUrlToObject(tab.url)
        console.log("urlObject: ", urlObject);


        chrome.tabs.sendMessage(tabId, {
            videoId: urlObject.v,
            tabId: tabId,
            type: 'NEW_VIDEO'
        });

        // console.log('loading complete');
    }
});

// receiving a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log('============================');
    // console.log('message received:', message);
    // console.log('sender:', sender);
    // console.log('sendResponse:', sendResponse);
});
