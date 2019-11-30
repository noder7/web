const body = document.querySelector("body");

const IMG_NUM = 3;

function genRandom() {
    const ranNum = Math.floor(Math.random() * IMG_NUM);
    return ranNum;
};

function displayImage(imageNumber) {
    const image = new Image();
    image.src = `images/${imageNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function init() {
    const randomNumber = genRandom();
    displayImage(randomNumber);
}

init();