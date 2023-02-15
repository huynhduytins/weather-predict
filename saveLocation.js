// For the save location button
saveBtn.addEventListener("click", () => {
  saveBtn.disabled = true;
  alert.classList.add("active");
  progress.classList.add("active");

  const value = input.textContent;
  currentLocation = value;

  localStorage.setItem("location", currentLocation);

  setTimeout(() => {
    alert.classList.remove("active");
  }, 3000);

  setTimeout(() => {
    progress.classList.remove("active");
  }, 3500);
});
