console.log('background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isOnTimer = tab.url.includes('https://vclock.com/');

    if (isOnTimer) {
        return;
    }

    console.log('============================');
    console.log('tabId:', tabId);
    console.log('changeInfo:', changeInfo);
    console.log('tab:', tab);

    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
        console.log('YouTube tab opened/loaded:', tab.url);
    }
});
