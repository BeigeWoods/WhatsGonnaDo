const timeForm = document.querySelector(".toDoHeader__formBar-timeForm"),
 timeInput = timeForm.querySelector("input"),
 toDoForm = document.querySelector(".toDoHeader__formBar-textForm"),
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector(".toDoList"),
 toDoLi = toDoList.querySelectorAll("li");

const TODOS_LS = "toDos",
 UNSHOWING_CN = "unshowingCN",
 CHECK_LI = "checkLi";

let toDos = [];

function paintToDos(toDo){
  toDoList.classList.add(SHOWING_CN);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const modiBtn = document.createElement("button");
  const modiBtnIco = document.createElement("img");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  checkBtn.innerText = "✔";
  checkBtn.className ="checkBtn";
  modiBtn.className ="modiBtn";
  delBtn.addEventListener("click", fadeAwayLi);
  checkBtn.addEventListener("click", checkToDo);
  modiBtn.addEventListener("click", modiToDo);
  modiBtnIco.src = "icons/pen.png";
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.appendChild(span);
  li.appendChild(modiBtn);
  modiBtn.appendChild(modiBtnIco);
  toDoList.appendChild(li);
  li.id = toDo.id;
  paintByChkAndTime(toDo, li, span);
}

const loadTodo = () => {
  toDos = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
  toDos.forEach(todo => {
    paintTodos(todo);
  });
}

function paintByChkAndTime(toDo, li, span){
  if(toDo.prog === "ongoing" && toDo.time === ""){
    li.classList.remove(CHECK_LI);
    span.innerText = `${toDo.text}`;
  }
  else if(toDo.prog === "ongoing" && toDo.time !== ""){
    li.classList.remove(CHECK_LI);
    span.innerText = `${toDo.time} ${toDo.text}`;
    countDownTime(toDo.time, li);
  }
  else if(toDo.prog !== "done" && toDo.time === ""){
    li.classList.add(CHECK_LI);
    span.innerText = `${toDo.text}`;
  }
  else {
    li.classList.add(CHECK_LI);
    span.innerText = `${toDo.time} ${toDo.text}`;
  }
}

function modiToDo(event){
  const mBtn = event.target;
  const li = mBtn.parentNode.parentNode;
  const getIdx = toDos.findIndex(obj => obj.id === li.id);
  const getObj = toDos[getIdx];
  const getText = getObj.text;
  const getTime = getObj.time;
  toDoInput.value = getText;
  if (getTime !== ""){
    timeInput.value = getTime;
  }
  deleteLi(li);
}

function checkToDo(event) {
  const cBtn = event.target;
  const li = cBtn.parentNode;
  changeLi(li);
}

function changeLi(li) {
  toDos = JSON.parse(localStorage.toDos);
  const getIdx = toDos.findIndex(obj => obj.id === li.id);
  const getObj = toDos[getIdx];
  if(getObj.prog === "ongoing"){
    li.classList.add(CHECK_LI);
    getObj.prog = "done";
  } else {
    li.classList.remove(CHECK_LI);
    getObj.prog = "ongoing";
    countDownTime(getObj.time, li);
  }
  toDos.splice(getIdx, 1, getObj);
  saveToDos();
}

function deleteToDo(event){
  const Dbtn = event.target;
  const li = Dbtn.parentNode;
  deleteLi(li);
}

function deleteLi(li){
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== li.id
  });
  toDos = cleanToDos
  saveToDos();
  if (!toDos.length){
    toDoList.classList.remove(SHOWING_CN);
  }
}

function fadeAwayLi(event){
  const Dbtn = event.target;
  const li = Dbtn.parentNode;
  li.classList.add(UNSHOWING_CN);
  setTimeout(deleteToDo, 500, event);
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleTodoSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  const getTimeValue = handleTimeSubmit(event);
  if (currentValue === ""){
    return;
  } else {
    const toDoObj = {
      text: currentValue,
      prog: "ongoing",
      time: getTimeValue,
      id: String(Date.now())
    };
    toDos.push(toDoObj);
    paintToDos(toDoObj);
    saveToDos();
    localStorage.removeItem("time");
    toDoInput.value="";
    timeInput.value="";
  }
}

function handleTimeSubmit(event){
  event.preventDefault();
  const timeValue = timeInput.value;
  return timeValue
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDos(toDo);
      toDos.push(toDo);
    });
  }
}

function deleteContent(){
  const li = toDoList.querySelectorAll("li")
  for(let i = 0; i < li.length; i++) {
    toDoList.removeChild(li[i]);
  }
  toDos = [];
  localStorage.removeItem("toDos");
  toDoList.classList.remove(SHOWING_CN);
}

function deleteInput(){
  toDoInput.value = "";
  timeInput.value = "";
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleTodoSubmit);
}

init();