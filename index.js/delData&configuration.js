const setting = document.querySelector(".setting"),
closeConfigAll = document.querySelector(".closeConfigAll"),
switchBell = configuration.querySelector(".switchBell"),
bellIcon = switchBell.querySelector(".bellIcon");

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
    configuration.style.display = "none";
    setTimeBox.style.display = "block";
}

function closeTimeConfig(){
    configuration.style.display = "block";
    setTimeBox.style.display = "none";
}

function closeAlarmBox(){
    alarmCont.style.display = "none";
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
    alarmGrid.addEventListener("click", closeAlarmBox);
    switchBell.addEventListener("click", clickedSwitchBell);
    closeConfigAll.onclick = function(){
        configuration.classList.remove(SHOWING_CF);
        configuration.classList.add(UNSHOWING_CF);
        setting.classList.remove(UNSHOWING_CF);
        setting.classList.add(SHOWING_CF);
        configuration.style.display = "block";
        setTimeBox.style.display = "none";
    }
}

init();