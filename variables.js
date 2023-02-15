let cacheCurrent = {};
let cacheForecast = {};
let cacheDegreeChart = {};

const apiKey = "83618b6f674544dfa5431037230802";
const apiURL = "https://restcountries.com/v2/all";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

let locations = [];
let currentLocation = localStorage.getItem("location");
let hours, minutes, seconds, setTimer, day, weekday;

const conditions = {
  Sunny: "day",
  "Partly cloudy": {
    c: "Partly Cloud",
    iNight: "cloudy-night-1",
    iDay: "cloudy-day-1",
  },
  Clear: "night",
  Cloudy: "cloudy",
  rain: "rainy-1",
};

// For the search component
const search = document.querySelector(".left");
const options = document.querySelector(".options");
const searchInput = document.querySelector(".search input");

const selectBtn = document.querySelector(".select-btn");

// // For the saveLocation component
const input = document.querySelector(".value");
const alert = document.querySelector(".alert");
const progress = document.querySelector(".progress");

const saveBtn = document.querySelector(".save-btn");

// Fetching current weather
const loading = document.querySelector(".loader");
const current = document.querySelector(".current");
const forecast = document.querySelector(".forecast");
const locationCurrent = document.querySelector(".current .location");
const degreeEl = document.querySelector(".degree");
const iconWeather = document.querySelector(".icon");
const conditionText = document.querySelector(".condition");
const imgBackground = document.querySelector(".imgBg");
const timeAndDate = document.querySelector(".date");
const weekdays = document.querySelector(".weekday");

const forecastBtn = document.querySelector(".btn-forecast");

const detailCurrentEl = {
  icon: document.querySelector(".icon"),
  wind: document.querySelector(".wind"),
  cloud: document.querySelector(".cloud"),
  pressure: document.querySelector(".pressure"),
  humidity: document.querySelector(".humidity"),
  precip: document.querySelector(".precip"),
  uv: document.querySelector(".uv"),
};

// Forecast
let currentBtn = 0;
const daysBtn = document.querySelectorAll(".day-container");

const conditionForecast = document.querySelector(".forecast .condition");
const degreeForecast = document.querySelector(".forecast .degree");
const forecastDay = document.querySelector(".forecast-day");
const iconForecast = document.querySelector(".forecast .weather-icon .icon");

const locationForecast = document.querySelector(".forecast .location");
const iconDays = document.querySelectorAll(".icon-day");
const degreeDays = document.querySelectorAll(".degree-day");

const errorLoading = document.querySelector(".error");

// Degree Chart
const charts = document.querySelectorAll(".chart-fill");
const degrees = document.querySelectorAll(".chart-bar .degree");
const locationChart = document.querySelector(".degree-chart .location");
const imgDegree = document.querySelector(".degree-chart .top img");
const degreeBtn = document.querySelector(".btn-degree");
const chartContainer = document.querySelector(".chart-container");
