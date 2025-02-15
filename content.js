let index = 0;
let imagesList = new Array();
const Tesseract = require('tesseract.js');

browser.runtime.onMessage.addListener((message) => {
    if (message.type === "FROM_POPUP") {
        grabImgs(message.data);
    }

    if (message.type === "UNHIGHLIGHT") {
        grabImgs("");
    }

    if (message.type === "MOVE_TO") {
        imagesList[index].classList.remove('textlens-highlight-selected');
        imagesList[index].classList.add('textlens-highlight-unselected');

        if (message.data === "FORWARDS") {
            if (imagesList.length > 0) {
                index = (index + 1) % imagesList.length;
            }
        }

        if (message.data === "BACKWARDS") {
            if (imagesList.length > 0) {
                index--;
                if (index < 0) {
                    index = imagesList.length - 1;
                }
            }
        }
        imagesList[index].scrollIntoView({behavior: "smooth", block: "center"});
        imagesList[index].classList.add('textlens-highlight-selected');
    }
});

function grabImgs(name) {
    index = 0
    imagesList.forEach(image => {
        if (image !== null) {
            image.classList.remove('textlens-highlight-unselected', 'textlens-highlight-selected');
        }
    });
    imagesList = new Array();
    if (name === "") return;
    imgs = document.querySelectorAll('img');
    const images = Array.from(imgs);
    images.forEach(image => {
        

        if (image.hasAttribute('src') && image.src.includes(name)) {
            image.classList.add("textlens-highlight-unselected");
            imagesList.push(image);
            return;
        }

        if (image.hasAttribute('alt') && image.alt.includes(name)) {
            image.classList.add("textlens-highlight-unselected");
            imagesList.push(image);
            return;
        }

        
        const boundingRect = image.getBoundingClientRect();
        if (boundingRect.width * boundingRect.height < 1000) return;

        Tesseract.recognize(
            image.src,
            'eng',
        ).then(({ data: { text } }) => {
            if (text.includes(name)) {
                image.classList.add("textlens-highlight-unselected");
                imagesList.push(image);
            }
        });
    });
    if (imagesList.length > 0) {
        imagesList[index].classList.add('textlens-highlight-selected');
    }
}