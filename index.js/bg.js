const body = document.querySelector("body");

const IMG_NUMBER = 11;

function imgFileRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function paintImage(imgNumber){
    const image = new Image();
    image.classList.add("bgImage");
    image.src = `images/${imgNumber + 1}.jpg`;
    body.prepend(image);
}

function removeImageEl(){
    const Bg = document.querySelector(".bgImage");
    Bg.remove();
}

function changeBg(){
    removeImageEl();
    const randomNumber = imgFileRandom();
    paintImage(randomNumber);
}

function init(){
    const randomNumber = imgFileRandom();
    paintImage(randomNumber);
}

init();