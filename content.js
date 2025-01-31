let index = 0;
let imagesList = new Array();

browser.runtime.onMessage.addListener((message) => {
    if (message.type === "FROM_POPUP") {
        grabImgs(message.data);
    }

    if (message.type === "UNHIGHLIGHT") {
        grabImgs("");
    }
});

function grabImgs(name) {
    index = 0
    imagesList.forEach(image => {
        if (image !== null) {
            image.classList.remove('textlens-highlight');
        }
    });
    imagesList = new Array();
    if (name === "") return;
    imgs = document.querySelectorAll('img');
    const images = Array.from(imgs);
    images.forEach(image => {
        if (image.hasAttribute('src') && image.src.includes(name)) {
            image.classList.add("textlens-highlight");
            imagesList.push(image);
        }

        if (image.hasAttribute('alt') && image.alt.includes(name)) {
            image.classList.add("textlens-highlight");
            imagesList.push(image);
        }
    });
}