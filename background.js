console.log('background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // skip if timer
    const isTimer = tab.url.includes('https://vclock.com/');
    if (isTimer) return;

    // only trigger when completed and on youtube
    const isCompleted = changeInfo.status === 'complete';
    const isYoutube = tab.url.includes('youtube.com/watch');
    if (isCompleted || isYoutube) {
        console.log('============================');
        console.log('tabId', tabId);
        console.log('changeInfo', changeInfo);
        console.log('tab updated', tab);
        console.log('---------------------------------');

        // make the URL object
        const url = new URL(tab.url).searchParams;
        console.log("url: ", url);

        // make object out of 'url'
        const urlObj = Object.fromEntries(url);
        console.log("urlObj: ", urlObj);

        // video id
        const videoId = urlObj.v;
        console.log("videoId: ", videoId);

        // send video id as message
        chrome.tabs.sendMessage(tabId, { videoId });
        
    }
});
