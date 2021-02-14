const askNameBody = document.querySelector(".askNameBody"),
 form = askNameBody.querySelector(".js-nameForm"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greetings"),
 toDoBody = document.querySelector(".toDoBody");

const USER_LS = "currentUser",
 SHOWING_CN = "showingCN";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    askNameBody.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
    askNameBody.classList.remove(SHOWING_CN);
    toDoBody.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //user isn't here
        askForName();
    } else {
        //user is here
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();