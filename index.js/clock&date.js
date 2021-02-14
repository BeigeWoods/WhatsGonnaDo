const clockContainer = document.querySelector(".js-clock"), 
 clockTitle = clockContainer.querySelector("h1"),
 clockContainerB = document.querySelector(".js-clockB"), 
 clockTitleB = clockContainerB.querySelector("h1"),
 dateData = document.querySelector(".js-date");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` :seconds}`;
    clockTitleB.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` :seconds}`;
}

function getCal(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = date.getDate();
    const day = date.getDay();
    const monthDic = {
        0 : 'Jan', 1 : 'Feb',
        2 : 'Mar', 3 : 'Apr',
        4 : 'May', 5 : 'Jun',
        6 : 'jul', 7 : 'Aug',
        8 : 'Sep', 9 : 'Oct',
        10 : 'Nov', 11 : 'Dec'
    };
    const dayDic = {
        0 : 'Sun', 1 : 'Mon',
        2 : 'Tue', 3 : 'Wed',
        4 : 'Thu', 5 : 'Fri', 6 : 'Sat'
    };
    dateData.innerText = `${monthDic[month]}.${
        days < 10 ? `0${days}` : days}.${year}  ${dayDic[day]}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
    getCal();
}

init();
