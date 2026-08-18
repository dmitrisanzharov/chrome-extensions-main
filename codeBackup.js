// CONTENT.js

    // let myDiv = document.createElement('div');
    // Object.assign(myDiv.style, {
    //     color: 'red',
    //     position: 'fixed',
    //     top: '0',
    //     left: '0',
    //     fontSize: '50px',
    //     zIndex: 100000
    // });
    // myDiv.innerHTML = 'Hello World';
    // document.body.appendChild(myDiv);

    // const appleDiv = document.querySelector('[data-analytics-title="continue button"]');
    // Object.assign(appleDiv.style, {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     background: 'green'
    // })


        // const img = document.createElement('img');
    // console.log("img: ", img);
    // img.src = chrome.runtime.getURL('assets/free.png');
    // img.id = 'victorId'
    // document.body.appendChild(img);

    // Object.assign(img.style, {
    //     width: '200px',
    //     height: '200px',
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     zIndex: 10000000
    // })

            // temp code

        let ytDiv = document.getElementById('start');
        let redSquare = document.createElement('div');
        setTimeout(() => {
            Object.assign(redSquare.style, {
                height: '100px',
                width: '100px',
                backgroundColor: 'red',
                
            });

            ytDiv.appendChild(redSquare);
        }, 3000);


        // attach code with observer


        function attachRedSquare(parentElement) {
            console.log('triggered');
            let redSquare = document.createElement('div');
            Object.assign(redSquare.style, {
                height: '100px',
                width: '100px',
                backgroundColor: 'red'
            });

            parentElement.appendChild(redSquare);
        }

        function waitForElementToAppear(domElementString, callbackFn) {
            const exists = document.querySelector(domElementString);
            console.log("exists: ", exists);

            if (exists) {
                callbackFn(exists);
                return;
            }

            const newObserver = new MutationObserver(() => {
                const elementThatWeWantToAppear = document.querySelector(domElementString);
                console.log("elementThatWeWantToAppear: ", elementThatWeWantToAppear);

                if (elementThatWeWantToAppear) {
                    newObserver.disconnect();
                    callbackFn(exists);
                    return;
                }
            });

            // const parentElementToWatch = document.body;
            //  let ytDiv = document.getElementById('start');
            const parentElementToWatch = document.body;
            console.log("parentElementToWatch: ", parentElementToWatch);

            const observerOptions = {
                childList: true,
                subtree: true
            };

            newObserver.observe(parentElementToWatch, observerOptions);
        }

        waitForElementToAppear('#start', attachRedSquare);