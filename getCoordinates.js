if (!currentLocation) {
  const successCallback = (position) => {
    fetchWeather(`${position.coords.latitude},${position.coords.longitude}`);
    fetchForecast(`${position.coords.latitude},${position.coords.longitude}`);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  clearInterval(setTimer);
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  updateName(currentLocation);
}
