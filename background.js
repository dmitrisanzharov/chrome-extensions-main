
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'sendMessage from background.js' }, (response) => {
        console.log('this is response from content script: ', response);
    });
});