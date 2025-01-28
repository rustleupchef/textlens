let index = 0;
let images;

browser.runtime.onMessage.addListener((message) => {
    if (message.type === "FROM_POPUP") {
        alert(images[0].getAttribute('src'));
    }
});

function grabImgs(name) {
    images = document.querySelectorAll('img');
}