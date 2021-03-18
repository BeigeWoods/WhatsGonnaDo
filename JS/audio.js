const music = document.querySelector(".music"),
musicTitle = music.querySelector(".music__title"),
audio = music.querySelector("audio"),
replay = music.querySelector(".music__audio-replay"),
replayIcon = replay.querySelector(".replayIcon"),
controller = music.querySelector(".music__audio-controller"),
controllIcon = controller.querySelector(".controllIcon"),
forward = music.querySelector(".music__audio-forward");

audio.loop = false;
audio.volume = 0.5;
let musNumber = 1;
const musValue = localStorage.getItem("currentMusic");

function saveMusValue(){
  localStorage.setItem("currentMusic", musNumber);
}

function playMusic(){
  const musValue = localStorage.getItem("currentMusic");
  if (audio.paused) {
    audio.src = `audio/${musValue}.mp3`;
    audio.play();
    controllIcon.src="icons/play.png";
  } else {
    audio.pause();
    controllIcon.src="icons/pause.png";
  }
}

function replayMusic(){
  if(!audio.loop){
    audio.loop = true;
    replayIcon.src="icons/replay1.png";
  } else {
    audio.loop = false;
    replayIcon.src="icons/replayA.png";
  }
}

function nextMusic(){
  const nowController = controllIcon.src.substr(-5, 1);
  if (musNumber < 6) {
    musNumber += 1;
    saveMusValue();
  } else {
    musNumber = 1;
    saveMusValue();
  }
  audio.src = `audio/${musNumber}.mp3`;
  audio.load();
  if (nowController === "y") {
    audio.play();
  }
  paintMusicTitle(localStorage.getItem("currentMusic"));
}

function paintMusicTitle(value){
  const musicList = {
    1: "Gymnopedie no.1 - Eric Satie",
    2: "Peacefully - E's Jammy Jams",
    3: "Morning Mood - Grieg",
    4: "Butterflies In Love - Sir Cubworth",
    5: "Waltz of the Flowers - Tchaikovsky",
    6: "Home for the Holidays - TrackTribe"
  };
  const getTitle = musicList[value];
  musicTitle.innerText = `${getTitle}`;
}

function loadMusic(){
  controllIcon.src="icons/pause.png";
  replayIcon.src="icons/replayA.png";
  if(musValue !== null){
    paintMusicTitle(musValue);
  } else {
    saveMusValue();
    paintMusicTitle(localStorage.getItem("currentMusic"));
  }
}

function init(){
  loadMusic();
  controller.addEventListener("click", playMusic);
  forward.addEventListener("click", nextMusic);
  replay.addEventListener("click", replayMusic);
  audio.addEventListener('ended', nextMusic);
}

init();