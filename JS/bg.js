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

function changeBg(){
  const Bg = document.querySelector(".bgImage");
  Bg.animate([
    { opacity: 0},
    { opacity: 1}],
    { duration: 500 });
  Bg.src = `images/${imgFileRandom() + 1}.jpg`;
}

function init(){
  const randomNumber = imgFileRandom();
  paintImage(randomNumber);
}

init();