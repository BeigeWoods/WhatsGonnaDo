const askNameBody = document.querySelector(".askName"),
 form = askNameBody.querySelector(".askName__form"),
 input = form.querySelector("input"),
 toDo = document.querySelector(".toDo"),
 greeting = toDo.querySelector(".toDoHeader__greetings");

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
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  askNameBody.classList.remove(SHOWING_CN);
  toDo.classList.add(SHOWING_CN);
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