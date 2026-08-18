(() => {
    console.log('content.js loaded');

    const url = window.location.href;
    const isYouTube = window.location.hostname === 'www.youtube.com';

    if (isYouTube) {
        // main code

        function addButtonFn(message) {
            console.log('added');

            const url = window.location.href;
            // console.log("url: ", url);
            let urlObj = Object.fromEntries(new URL(url).searchParams.entries());
            // console.log("urlObj: ", urlObj);

            const videoId = urlObj.v;
            console.log('videoId: ', videoId);

            const timeStamp = document.getElementsByClassName('video-stream')[0].currentTime;
            console.log('timeStamp: ', timeStamp);

            // get all videoId array
            chrome.storage.local.get(videoId.toString()).then((result) => {
                console.log('result: ', result);

                let arrayToAdd = result[videoId] ? [...result[videoId], timeStamp].sort((a,b)=> a-b) : [timeStamp]
                console.log("arrayToAdd: ", arrayToAdd);

                chrome.storage.local.set({ [videoId]: arrayToAdd }, (result) => {
                    chrome.storage.local.get(null, (result) => {
                        console.log('all items in storage under this VideoId key', result);
                    });
                });
            });
        }

        const addButton = document.createElement('button');
        addButton.innerHTML = 'Add timestamp';
        addButton.onclick = addButtonFn;
        Object.assign(addButton.style, {
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: '100px',
            width: '100px'
        });

        document.body.appendChild(addButton);

        const img = document.createElement('img');
        // console.log('img: ', img);
        img.src = chrome.runtime.getURL('assets/free.png');
        img.id = 'victorId';
        img.onclick = addButtonFn;
        document.body.appendChild(img);

        Object.assign(img.style, {
            width: '200px',
            height: '200px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 10000000
        });

        chrome.runtime.onMessage.addListener((message, sender, responseFn) => {
            console.log('message', message);

            const isYouTube = message.type === 'YOUTUBE_VIDEO';

            // if (isYouTube) {
            //     addButtonFn(message);
            // }
        });

        // end of isYoutube code
    }
})();
