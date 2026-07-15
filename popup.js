import { getCurrentTab } from './utils.js';
console.log('popup.js loaded');


document.addEventListener('DOMContentLoaded', async () => {

    const mainTab = await getCurrentTab();
    console.log("mainTab: ", mainTab);
   
    const urlObj = new URL(mainTab.url);

    const isYouTube = urlObj.hostname === 'www.youtube.com';

    if (isYouTube) {
        console.log('we are on youtube');
        const videoId = urlObj.searchParams.get('v');
        console.log('videoId: ', videoId);
    }

});
