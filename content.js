(() => {
    console.log('content.js loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponseFn) => {
        console.log('============================');
        console.log('message', message);
        console.log('sender', sender);
        console.log('sendResponseFn', sendResponseFn);
    });

    // document.getElementById('victorId')
})();
