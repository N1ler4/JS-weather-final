"use strict";

const URL = "https://api.weatherapi.com/v1";
let key = "c583ae563f4e44adbf7122055240203";
let city = "Toshkent";
let baseURL = `https://api.weatherapi.com/v1/forecast.json?key=${key}&days=5&q=${city}`;

//--------------------------------variables

let darkMode = $(".animation");
let body = $("body");
let darkModeBtnActive = $(".circle");
let nowTime = $("#nowTime");
let cityLocation = $$("#location");
let sunrise = $("#sunrise");
let sunset = $("#sunset");
let sun = $(".sun");
let pressure = $("#pressure");
let uv = $("#uv");
let humidity = $("#humidity");
let wind = $("#wind");
let secondUL = $("#second-ul");


// --------------------------------time
function updateTime() {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  let timeString = hours + ":" + minutes + ":" + seconds;

  nowTime.innerHTML = timeString;
}

updateTime();
setInterval(updateTime, 1000);

// ------------------------------- month,year,day
function date() {
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  let dateString = day + "." + month + "." + year;

  let dateElement = document.getElementById("currentDate");

  dateElement.innerHTML = dateString;
}
date();

// --------------------------------URL

async function getURL() {
  try {
    let res = await fetch(baseURL);
    let result = await res.json();
    render(result); // Pass the result to getSunrise
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getURL();
// -------------------------------functions

darkMode.addEventListener("click", (el) => {
  body.classList.toggle("darkMode");
  darkModeBtnActive.classList.toggle("circleMove");
});

async function render(result) {
  cityLocation[0].innerHTML = `${city}`;
  cityLocation[1].innerHTML = `${city}`;
  sunrise.innerHTML = `${result.forecast.forecastday[0].astro.sunrise}`;
  sunset.innerHTML = `${result.forecast.forecastday[0].astro.sunset}`;

  let sunSet = createElement(
    "div",
    "sunSet",
    `
  <img src="${result.current.condition.icon}" alt="sun">
  <h2>${result.current.condition.text}</h2>
  `
  );

  pressure.innerHTML = `${result.current.pressure}`
  uv.innerHTML = `${result.current.uv}`
  humidity.innerHTML = `${result.current.humidity}`
  wind.innerHTML = `${result.current.wind_kph}`

  sun.appendChild(sunSet);

  secondUL.innerHTML = "";
        for(let i = 0; i < 5; i++){
            let day5 = createElement('li', "", `
                <img src="${result.forecast.forecastday[i].day.condition.icon}" alt="">
                <p>${result.forecast.forecastday[i].day.maxtemp_c}°C</p>
                <p>${result.forecast.forecastday[i].day.condition.text}</p>
            `)
            secondUL.appendChild(day5)
        }
}
