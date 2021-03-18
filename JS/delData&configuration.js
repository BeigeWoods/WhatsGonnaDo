const setting = document.querySelector(".setting"),
forCloseSetting = document.querySelector(".forCloseSetting"),
switchBell = configuration.querySelector(".configuration__switchBell"),
bellIcon = switchBell.querySelector("img");

const SHOWING_CF = "showingCf",
UNSHOWING_CF = "unshowingCf";

let getBell = "on";
const chkBell = localStorage.getItem("bellSwitch");

function deleteAllData(){
  if(confirm("모든 데이터를 삭제하시겠습니까?")){
    localStorage.clear();
    location.reload();
  }
}

function showConfig(){
  setting.classList.remove(SHOWING_CF);
  setting.classList.add(UNSHOWING_CF);
  configuration.classList.remove(UNSHOWING_CF);
  configuration.classList.add(SHOWING_CF);
}

function unshowConfig(){
  configuration.classList.remove(SHOWING_CF);
  configuration.classList.add(UNSHOWING_CF);
  setting.classList.remove(UNSHOWING_CF);
  setting.classList.add(SHOWING_CF);
}

function timeConfig(){
  configuration.classList.remove(SHOWING_CF);
  configuration.classList.add(UNSHOWING_CF);
  setTimeBox.style.display = "block";
}

function closeTimeConfig(){
  configuration.classList.add(SHOWING_CF);
  configuration.classList.remove(UNSHOWING_CF);
  setTimeBox.style.display = "none";
}

function closeAlarmBox(){
  alarm.style.display = "none";
}

function saveBellValue(){
  localStorage.setItem("bellSwitch", getBell);
}

function clickedSwitchBell(){
  if(getBell === "on"){
    getBell = "off";
    saveBellValue();
    paintSwitchBell(localStorage.getItem("bellSwitch"));
  } else {
    getBell = "on";
    saveBellValue();
    paintSwitchBell(localStorage.getItem("bellSwitch"));
  }
}

function paintSwitchBell(value){
  if(value === "on"){
    bellIcon.src="icons/bellOn.png";
  } else {
    bellIcon.src="icons/bellOff.png";
  }
}

function loadBell(){
  if(chkBell === null){
    saveBellValue();
    paintSwitchBell(localStorage.getItem("bellSwitch"));
  } else {
    paintSwitchBell(chkBell);
  }
}

function init(){
  loadBell();
  alarmBox.addEventListener("click", closeAlarmBox);
  switchBell.addEventListener("click", clickedSwitchBell);
  forCloseSetting.onclick = function(){
    configuration.classList.remove(SHOWING_CF);
    configuration.classList.add(UNSHOWING_CF);
    setting.classList.remove(UNSHOWING_CF);
    setting.classList.add(SHOWING_CF);
    setTimeBox.style.display = "none";
  }
}

init();