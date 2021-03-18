const setTimeBox = document.querySelector(".setTimeInterval"),
timeBtn = setTimeBox.querySelectorAll(".setTimeInterval__box-time"),
alarm = document.querySelector(".alarm"),
alarmBox = alarm.querySelector(".alarm__box"),
alarmTime = alarm.querySelector(".alarm__box-time"),
alarmText = alarm.querySelector(".alarm__box-text"),
ringBell = alarm.querySelector(".alarm__ringBell"),
configuration = document.querySelector(".configuration");

const IntValue = localStorage.getItem("timeInterval");

function paintTimeBtn(){
  for(let i = 0; i < timeBtn.length; i++) {
    if (timeBtn[i].value === localStorage.getItem("timeInterval")) {
      timeBtn[i].classList.add("clicked");
    } else {
      timeBtn[i].classList.remove("clicked");
    }
  }
}

function defaltSetTimeValue(){
  if (IntValue === null){
    localStorage.setItem("timeInterval", 10);
  }
}

function countDownTime(time, li){
  const countDown = setInterval(function() {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth()+1;
    const days = getDate.getDate();
    const dTime = new Date(`${month} ${days} ${year} ${time}:00 GMT+0900`);
    const untilD = dTime - getDate;
    const second = Math.floor(untilD/1000);
    toDos = JSON.parse(localStorage.toDos);
    const getIdx = toDos.findIndex(obj => obj.id === li.id);
    if (getIdx === -1 || toDos[getIdx].prog === "done"){
      clearInterval(countDown);
    }
    ringAlarmForm(second, li, countDown);
  }, 1000);
}

function ringAlarmForm(second, li, countDown){
  for(let t = 2; t > 0; t--){
    if (second === localStorage.getItem("timeInterval") * t * 60){
      ringAlarm(second, li);
    }
  }
  if (second <= 0) {
    clearInterval(countDown);
    ringAlarm(second, li);
    changeLi(li);
  } 
}

function ringAlarm(second, li){
  const minute = Math.floor(second/60);
  const getText = li.childNodes[2].textContent;
  if(second === 0){
    alarmTime.innerText="정각입니다!";
    alarmBox.classList.add("shakeAlarmBox")
  } 
  else if (second > 0){
    alarmTime.innerText=`${minute}분 전`;
    alarmBox.classList.add("shakeAlarmBox")
  } else if (second < 0) {
    return;
  }
  alarmText.innerText=`${getText}`;
  alarm.style.display = "block";
  if(getBell === "on"){
    ringBell.volume = 1;
    ringBell.src = "audio/bell.mp3";
    ringBell.loop = false;
    ringBell.play();
  }
}

function handleTimeBtn(event){
  const selectBtn = event.target;
  const timeValue = selectBtn.value;
  localStorage.setItem("timeInterval", timeValue);
  paintTimeBtn();
}

function init(){
  for(let j = 0; j < timeBtn.length; j++) {
    timeBtn[j].addEventListener("click", handleTimeBtn);
  }
  defaltSetTimeValue();
  paintTimeBtn();
}

init();