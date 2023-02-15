const dayOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
let dataDegree;

const fetchForecast = async (location) => {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`
  );
  res = await res.json();
  console.log(res);

  cacheForecast[location] = res.forecast;
  dataDegree = res;

  resetForecastCard(res.forecast);
};

const resetForecastCard = (data) => {
  daysBtn[currentBtn].classList.remove("day-active");
  currentBtn = 0;
  daysBtn[currentBtn].classList.add("day-active");
  updateForecastCard(data);
};

const updateIcon = (check) => {
  if (check.includes("sunny") || check.includes("clear")) {
    conditionForecast.textContent = "Sunny";
    iconForecast.src = "./assets/weather icons/animated//day.svg";
  } else if (check.includes("rain")) {
    conditionForecast.textContent = "Rainy";
    if (check.includes("moderate")) {
      iconForecast.src = `./assets/weather icons/animated//rainy-5.svg`;
    } else {
      iconForecast.src = `./assets/weather icons/animated//rainy-1.svg`;
    }
  } else if (check.includes("partly")) {
    conditionForecast.textContent = "Partly Cloud";
    iconForecast.src = `./assets/weather icons/animated//cloudy-day-1.svg`;
  } else {
    conditionForecast.textContent = "Overcast";
    iconForecast.src = `./assets/weather icons/animated//cloudy.svg`;
  }
};

const updateForecastCard = (data, index = -1) => {
  if (index === -1) {
    data.forecastday.forEach((day, id) => {
      iconDays[id].src = day.day.condition.icon;
      iconDays[id].classList.remove(iconDays[id].classList[1]);
      iconDays[id].classList.add(day.day.condition.text.split(" ").join("-"));
      degreeDays[id].innerHTML =
        Math.round(day.day.avgtemp_c).toString() + "&#176;C";
    });
    updateForecastCard(daysBtn[0], 0);
  } else {
    const c = dayOfWeek.indexOf(weekdays.textContent);
    degreeForecast.innerHTML = data.lastElementChild.textContent;

    forecastDay.textContent =
      dayOfWeek[(c + index) % 7] === weekdays.textContent
        ? "TODAY"
        : dayOfWeek[(c + index) % 7];

    updateIcon(data.firstElementChild.classList[1].toLowerCase());
  }
};

daysBtn.forEach((el, index) => {
  el.addEventListener("click", () => {
    daysBtn[currentBtn].classList.remove("day-active");
    el.classList.add("day-active");
    currentBtn = index;
    updateForecastCard(el, index);
  });
});

degreeBtn.addEventListener("click", () => {
  loading.classList.add("visible");
  current.classList.add("visible");
  forecast.classList.add("visible");
  chartContainer.classList.remove("visible");
  forecastBtn.textContent = "Current";

  tempStatic(dataDegree);
});
