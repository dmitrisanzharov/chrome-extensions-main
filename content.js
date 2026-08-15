(() => {
    console.log('content.js loaded');

    let myDiv = document.createElement('div');
    Object.assign(myDiv.style, {
        color: 'red',
        position: 'fixed',
        top: '0',
        left: '0',
        fontSize: '50px',
        zIndex: 100000
    });
    myDiv.innerHTML = 'Hello World';
    document.body.appendChild(myDiv);
})();
