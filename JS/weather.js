const weather = document.querySelector(".today__weather");

const API_KEY = "60d5b5de2a481dc41b7926ed21961036";
const COORDS = 'coords';

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    const WIcon = document.getElementById("weatherIcon");
    const temperature = json.main.temp;
    const place = json.name;
    const id = json.weather[0].id;
    //const wIcon = json.weather[0].icon;
    weather.innerText = `${temperature}°C in ${place}`;
    WIcon.innerHTML = `<i class="wi wi-owm-${id}"></i>`
    //icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${wIcon}.png"/>`
  });
}

function saveCoords(coordObj){
  localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const coordObj = {
    latitude,
    longitude
  };
  saveCoords(coordObj);
  getWeather(latitude, longitude);
}

function handleGeoError(position){
  console.log("Can't access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();