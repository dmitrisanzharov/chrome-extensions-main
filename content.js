(() => {
    console.log('content.js loaded');

    console.log('chrome tabs', chrome.tabs);

    chrome.runtime.onMessage.addListener((message, sender, sendResponseFn) => {
        console.log('============================');
        console.log('message', message);
        console.log('sender', sender);
        console.log('sendResponseFn', sendResponseFn);

        if (message.url === 'YOUTUBE') {
            console.log('message finally', message.text);
        }
    });

    chrome.runtime.sendMessage({ title: 'from content.js', text: 'omg omg it worked' });


    chrome.storage.local.get().then(result => {
        console.log('result', result);
    })

    // document.getElementById('victorId')
})();
