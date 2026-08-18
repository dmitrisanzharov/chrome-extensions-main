console.log('background loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {


    const isComplete = changeInfo.status === 'complete';
    const isYouTube = tab.url.includes('youtube.com/watch');

    if(isComplete && isYouTube){
        console.log('we are on youtube');

        const href = tab.url;
        console.log("href: ", href);
        const urlObj = Object.fromEntries(new URL(href).searchParams.entries());
        console.log("urlObj: ", urlObj); // video is under V key
        

        chrome.tabs.sendMessage(tabId, {
            type: 'YOUTUBE_VIDEO',
            tabId: tabId,
            tabObj: tab,
            videoUrlObj: urlObj
        })



    }

})