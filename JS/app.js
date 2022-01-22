/************************** REFERENCES *************************/
// Buttons
const btns = document.querySelectorAll("button");
const getLocBtn = document.getElementById("get-loc-btn");
const homeLocBtn = document.getElementById("home-loc-btn");
const saveLocBtn = document.getElementById("save-loc-btn");
const toggleBtn = document.getElementById("toggle-units-btn");
const refreshBtn = document.getElementById("refresh-weather-btn");
// Content
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentForeCastSection = document.getElementById("current-forecast-sect");
const weeklyForeCastSection = document.getElementById("weekly-forecast-sect");
/************************** IMPORTS *************************/
import {
  setLocation,
  analyzeText,
  getCoords,
  getWeather,
} from "./dataFunctions.js";
import {
  setPlaceholderText,
  addSpinner,
  displayError,
  displayApiError,
  updateScr,
  updateDisplay,
} from "./domFunctions.js";
import { CurrentLocation, Coords } from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();
/************************** INITIALIZE THE APP *************************/
const initApp = () => {
  // Event Listeners
  btns.forEach((btn) =>
    btn.addEventListener("click", () => addSpinner(btn.querySelector(".fas")))
  );
  searchForm.addEventListener("submit", searchLoc);
  getLocBtn.addEventListener("click", () => getLocation());
  homeLocBtn.addEventListener("click", () => loadWeather());
  saveLocBtn.addEventListener("click", saveLocation);
  toggleBtn.addEventListener("click", toggleUnits);
  refreshBtn.addEventListener("click", () => updateAndDisplay(currentLoc));
  // Set up
  setPlaceholderText(searchInput);
  //load
  loadWeather();
};
document.addEventListener("DOMContentLoaded", initApp);

/************************** FUNCTIONS *************************/
// Search Location
const searchLoc = async (e) => {
  e.preventDefault();
  let text = analyzeText(searchInput.value);
  if (!text) return;
  const coordsData = await getCoords(text, currentLoc.getUnit());
  if (coordsData) {
    if (coordsData.cod === 200) {
      const myCoords = new Coords(
        coordsData.sys.country
          ? `${coordsData.name},${coordsData.sys.country}`
          : coordsData.name,
        coordsData.coord.lat,
        coordsData.coord.lon
      );
      setLocation(currentLoc, myCoords);
      updateAndDisplay(currentLoc);
      searchInput.value = "";
    } else {
      displayApiError(coordsData);
    }
  } else {
    displayError("Connection Error", "Connection Error");
  }
};
//Get Location
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(locSuccess, locError);
};
const locSuccess = (pos) => {
  const myCoords = new Coords(
    `Lat: ${pos.coords.latitude}, Long: ${pos.coords.longitude}`,
    pos.coords.latitude,
    pos.coords.longitude
  );
  setLocation(currentLoc, myCoords);
  updateAndDisplay(currentLoc);
};
const locError = (error) => displayError(error.message, error.message);
//Load Weather
const loadWeather = (e) => {
  let savedLocation = JSON.parse(localStorage.getItem("HomeLocation"));
  if (!savedLocation && !e) return getLocation();
  if (!savedLocation && e.type === "click")
    displayError(
      "No Home Location Saved",
      "No Home Location Saved.Please Save a location first."
    );
  else {
    const myCoords = new Coords(
      savedLocation.name,
      savedLocation.lat,
      savedLocation.long,
      savedLocation.unit
    );
    setLocation(currentLoc, myCoords);
    updateAndDisplay(currentLoc);
  }
};
//Save Location
const saveLocation = () => {
  const location = {
    name: currentLoc.getName(),
    lat: currentLoc.getLat(),
    long: currentLoc.getLong(),
    unit: currentLoc.getUnit(),
  };
  localStorage.setItem("HomeLocation", JSON.stringify(location));
  updateScr(`${location.name} is saved as your home location.`);
};
//Toggle Units
const toggleUnits = () => {
  currentLoc.toggleUnit(currentLoc.getUnit());
  updateAndDisplay(currentLoc);
};
//update data and display
const updateAndDisplay = async (location) => {
  const weatherData = await getWeather(location);
  console.log(weatherData);
  if (weatherData)
    updateDisplay(
      currentForeCastSection,
      weeklyForeCastSection,
      currentLoc,
      weatherData
    );
  else
    displayError(
      "Connection Error",
      "Connection Error: Data could not be fetched!"
    );
};
