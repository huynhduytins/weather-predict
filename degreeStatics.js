const tempStatic = (data) => {
  if (!cacheDegreeChart[data.location.name]) {
    cacheDegreeChart[data.location.name] = data;
  }
  locationChart.textContent =
    selectBtn.firstElementChild.textContent === "Select Location"
      ? data.location.name
      : selectBtn.firstElementChild.textContent;

  let temp = 0;
  for (let i = 0; i <= 6; ++i) {
    charts[i].style.height = "100%";
  }

  setTimeout(() => {
    for (let i = 6; i <= 18; i += 2) {
      temp = Math.ceil(data.forecast.forecastday[0].hour[i].temp_c);
      charts[(i - 6) / 2].style.height = temp > 0 ? `${temp}%` : "0%";
      degrees[(i - 6) / 2].innerHTML = `${temp}&#176;C`;
    }
  }, 500);
};
