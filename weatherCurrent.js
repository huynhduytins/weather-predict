const reUpdate = (res) => {
  setTimeout(async () => {
    let res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );
    res = await res.json();
    cacheCurrent[location] = res;
    if (selectBtn.firstElementChild.textContent === location) {
      updateCurrentWeatherCard(res, location);
    } else {
      reUpdate(res);
    }
    console.log(res);
  }, (16 - (parseInt(res.location.localtime.split(" ")[1].split(":")[1]) % 15)) * 60 * 1000);
};

const fetchWeather = async (location) => {
  forecastBtn.disabled = true;
  degreeBtn.disabled = true;
  try {
    let res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );

    if (res.ok) {
      setTimeout(() => {
        loading.classList.add("visible");
        errorLoading.classList.add("visible");
        chartContainer.classList.add("visible");
        current.classList.remove("visible");
        forecastBtn.disabled = false;
        degreeBtn.disabled = false;
      }, 2000);

      res = await res.json();

      if (location.includes(",")) {
        location = res.location.name;
      }

      cacheCurrent[location] = res;

      //Save the new location
      !locations.includes(location) &&
        locations.push(location) &&
        console.log(locations);

      updateCurrentWeatherCard(res, location);
      fetchForecast(location);
    } else {
      errorLoading.classList.remove("visible");
      loading.classList.add("visible");
      current.classList.add("visible");
      forecast.classList.add("visible");
      locationCurrent.textContent = "";
    }
  } catch {
    console.log("loi kia");
  }
};

const updateCurrentWeatherCard = (data, location) => {
  reUpdate(data);
  let condition = data.current.condition.text;
  const h = parseInt(data.location.localtime.split(" ")[1].slice(0, 2));
  const bg = h >= 7 && h <= 18 ? "day" : "night";
  let icon = "";

  condition.includes("rain") && (condition = "rain");
  condition === "clear" && h >= 7 && h <= 18 && (condition = "Sunny");

  day = data.location.localtime.split(" ")[0].split("-");

  if (conditions[condition]) {
    if (condition === "Partly cloudy") {
      if (h >= 7 && h <= 18) {
        icon = conditions[condition].iDay;
      } else {
        icon = conditions[condition].iNight;
      }
      condition = "Party Cloud";
    } else {
      icon = conditions[condition];
    }
  } else {
    icon = "cloudy";
  }

  if (data.location.country === "Vietnam") {
    [hours, minutes, seconds, weekday] = getCurrentHour().map((el, index) => {
      if (index < 3) {
        return parseInt(el);
      }
      return el;
    });
  } else {
    [hours, minutes, weekday] = getHoursAb(data).map((el, index) => {
      if (index < 2) {
        return parseInt(el);
      }
      return el;
    });
    seconds = 0;
  }

  locationCurrent.textContent = location;
  locationForecast.textContent = location;

  imgBackground.src = `./assets/${bg}.jpg`;
  iconWeather.src = `./assets/weather icons/animated//${icon}.svg`;
  conditionText.textContent = condition;
  weekdays.textContent = weekday.toUpperCase();

  degreeEl.innerHTML = data.current.temp_c + "&#176;C";
  detailCurrentEl.wind.textContent = data.current.wind_kph + " kph";
  detailCurrentEl.pressure.textContent = data.current.pressure_in + " in";
  detailCurrentEl.precip.textContent = data.current.precip_in + " in";
  detailCurrentEl.cloud.textContent = data.current.cloud + " %";
  detailCurrentEl.humidity.textContent = data.current.humidity + " %";
  detailCurrentEl.uv.textContent = data.current.uv + ".0";

  countTime();
};

const countTime = () => {
  seconds++;
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }
  if (hours === 24) {
    hours = 0;
  }
  timeAndDate.innerHTML = `${hours > 9 ? hours : "0" + hours}:${
    minutes > 9 ? minutes : "0" + minutes
  }:${seconds > 9 ? seconds : "0" + seconds} &#x2022; ${day[2]}/${day[1]}`;
  setTimer = setTimeout(countTime, 1000);
};

const getCurrentHour = () => {
  const d = new Date();
  return [
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.toString().split(" ")[0],
  ];
};

const getHoursAb = (data) => {
  const d = new Date(data.location.localtime);
  return [
    ...data.location.localtime.split(" ")[1].split(":"),
    d.toString().split(" ")[0],
  ];
};

forecastBtn.addEventListener("click", () => {
  if (
    current.classList.contains("visible") &&
    forecast.classList.contains("visible")
  ) {
    current.classList.remove("visible");
    chartContainer.classList.add("visible");
  } else {
    current.classList.toggle("visible");
    forecast.classList.toggle("visible");
  }
  (forecastBtn.textContent === "Forecast" &&
    (forecastBtn.textContent = "Current")) ||
    (forecastBtn.textContent = "Forecast");
});
