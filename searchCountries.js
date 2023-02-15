async function getLocations() {
  try {
    const res = await fetch(apiURL);
    locations = await res.json();
    locations = locations.map((location) => location.name);
    localStorage.setItem("locations", JSON.stringify(locations));
    updateSearch(locations);
  } catch {
    console.log("error");
  }
}

function updateName(location) {
  if (location !== locationCurrent.textContent) {
    current.classList.add("visible");
    forecast.classList.add("visible");
    loading.classList.remove("visible");
    search.classList.remove("active");
    forecastBtn.textContent = "Forecast";

    selectBtn.firstElementChild.textContent = location;

    clearInterval(setTimer);

    //Check the cache for the current component
    if (cacheCurrent[location]) {
      setTimeout(() => {
        loading.classList.add("visible");
        errorLoading.classList.add("visible");
        current.classList.remove("visible");
      }, 0);
      tempStatic(cacheDegreeChart[location]);
      updateCurrentWeatherCard(cacheCurrent[location], location);
      resetForecastCard(cacheForecast[location]);
    } else {
      fetchWeather(location);
    }

    (location === currentLocation && (saveBtn.disabled = true)) ||
      (saveBtn.disabled = false);
  } else {
    search.classList.remove("active");
  }
}

const checkLocations = localStorage.getItem("locations");
if (!checkLocations) {
  getLocations();
} else {
  locations = JSON.parse(checkLocations);
  locations.sort();
  updateSearch(locations);
}

function updateSearch(locations) {
  locations.forEach((location) => {
    const li = `<li onclick="updateName(this.textContent)">${location}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

// //Events
selectBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  let searchLocation = locations.filter((location) => {
    return location.toLowerCase().startsWith(value);
  });
  options.innerHTML = "";
  if (value) {
    searchLocation = [value.capitalize(), ...searchLocation];
  }
  updateSearch(searchLocation);
});
