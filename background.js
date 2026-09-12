console.log('background.js loaded');

chrome.tabs.onUpdated.addEventListener((tabId, changeInfo, tabs)=> {
     console.log('============================');
     console.log('tabId', tabId);
     console.log('changeInfo', changeInfo);
     console.log('tabs', tabs);
})