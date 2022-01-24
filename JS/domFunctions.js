export const setPlaceholderText = (input) => {
  input.placeholder =
    window.innerWidth < 400
      ? "City, State, Country"
      : "City, State, Country or Zip Code";
};

export const addSpinner = (icon) => {
  const classes = Array.from(icon.classList);
  const newClasses = classes.slice(0);
  newClasses.splice(1, 2, "fa-circle-notch fa-spin text-tr");
  changeIcon(icon, newClasses);
  setTimeout(() => changeIcon(icon, classes), 1000);
};

const changeIcon = (icon, classes) => {
  icon.className = classes.toString().replace(/[,]/g, " ");
};

export const displayError = (hdrMsg, scrMsg) => {
  updateHdr(hdrMsg);
  updateScr(scrMsg);
};
export const displayApiError = (statusCode) => {
  const msg = toProperCase(statusCode.message);
  updateHdr(msg);
  updateScr(msg);
};

const toProperCase = (text) => {
  return text
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
};

const updateHdr = (msg) =>
  (document.getElementById("current-loc").textContent = msg);
export const updateScr = (msg) =>
  (document.getElementById("confirmation").textContent = msg);

/************UPDATE DISPLAY**************/
export const updateDisplay = (cfsect, hfsect, wfsect, locObj, weatherObj) => {
  let iconSize = window.innerWidth > 250 ? "@2x" : "";
  const currentForeCast = cfsect.querySelector("#current-forecast");
  fadeData(cfsect, wfsect);
  clearData(currentForeCast, wfsect);
  setBgImg(document.querySelector("main"), weatherObj);
  createCurrentHtml(cfsect, currentForeCast, iconSize, locObj, weatherObj);
  createHourlyHtml(hfsect, iconSize, locObj, weatherObj);
  createWeeklyHtml(wfsect, iconSize, weatherObj);
  fadeData(cfsect, wfsect);
};
const fadeData = (...arr) => {
  arr.forEach((sect) => {
    sect.classList.toggle("fade-in");
    sect.classList.toggle("invisible");
  });
};
const clearData = (currentForeCast, wfsect) => {
  currentForeCast.innerHTML = "";
  wfsect.innerHTML = "";
};
const setBgImg = (main, weatherObj) => {
  let condition = parseInt(weatherObj.current.weather[0].icon.slice(0, 2));
  let time = weatherObj.current.weather[0].icon.slice(2);
  let prevClass = Array.from(main.classList)[0];
  let classesObj = {
    "01": "bg-sun",
    "02": "bg-partly-cloudy",
    "03": "bg-partly-cloudy",
    "04": "bg-clouds",
    "09": "bg-rain",
    10: "bg-rain",
    11: "bg-thunder",
    13: "bg-snow",
    50: "bg-fog",
  };
  let bgClass = getImg(condition, classesObj);
  if (time === "d") {
    main.classList.replace(prevClass, bgClass);
  } else {
    main.classList.replace(prevClass, "bg-night");
  }
};
const getImg = (code, obj) => {
  for (const key in obj) {
    if (key == code) {
      return obj[key];
    }
  }
};
const createEl = (type, text, ...attr) => {
  const attributes = attr.toString().replace(/[,]/g, " ");
  if (!text) return `<${type} ${attributes}></${type}>`;
  if (!attr) return `<${type}>${text}</${type}>`;
  else return `<${type} ${attributes}>${text}</${type}>`;
};
// Display current weather
const createCurrentHtml = (
  cfsect,
  currentForeCast,
  iconSize,
  locObj,
  weatherObj
) => {
  displayNameAndDate(cfsect, locObj);
  let html =
    createImgDiv(weatherObj, iconSize) + createContentDiv(locObj, weatherObj);
  currentForeCast.innerHTML = html;
};

const displayNameAndDate = (cfsect, locObj) => {
  const wordArr = locObj.getName().split(" ");
  const name =
    wordArr.indexOf("Lat:") !== -1
      ? `Lat: ${parseFloat(wordArr[1]).toFixed(3)} , Long: ${parseFloat(
          wordArr[3]
        ).toFixed(3)} `
      : locObj.getName();
  updateHdr(name);
  cfsect.querySelector("#date").textContent = formattedDate();
};
const formattedDate = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const createImgDiv = (weatherObj, iconSize) => {
  const properDesc = toProperCase(weatherObj.current.weather[0].description);
  const iconID = weatherObj.current.weather[0].icon;
  const img = createEl(
    "img",
    "",
    `src="http://openweathermap.org/img/wn/${iconID}${iconSize}.png"`,
    `alt="partly-cloudy"`,
    `class="m-auto h-[35vh]"`
  );
  const imgPara = createEl(
    "p",
    `${properDesc}`,
    "class = 'text-center -mt-10 mb-6 tracking-wider'"
  );
  return createEl("div", `${img} ${imgPara}`);
};

const createContentDiv = (locObj, weatherObj) => {
  const temp = Math.round(weatherObj.current.temp);
  const tempUnit = locObj.getUnit() === "imperial" ? "&deg;F" : "&deg;C";
  const windUnit = locObj.getUnit() === "imperial" ? "mph" : "m/s";
  const feels = Math.round(weatherObj.current.feels_like);
  const speed = weatherObj.current.wind_speed;
  const humidity = weatherObj.current.humidity;
  updateScr(
    `The Temperture is ${temp} ${tempUnit},wind speed is ${speed} ${windUnit} and humidity is ${humidity}% in ${locObj.getName()}`
  );
  const text = ` <div
  class="w-full sm:flex sm:justify-evenly sm:items-center gap-3"
>
  <p class="text-white/50 sm:mr-3">Temp</p>
  <p id="temp-val">${temp} ${tempUnit}</p>
</div>
<div
  class="w-full sm:flex sm:justify-evenly sm:items-center gap-3 hidden"
>
  <p class="text-white/50 sm:mr-3">Feels Like</p>
  <p id="feels-val">${feels} ${tempUnit}</p>
</div>
<div
  class="w-full sm:flex sm:justify-evenly sm:items-center gap-3"
>
  <p class="text-white/50 sm:mr-3">Wind</p>
  <p id="wind-speed">${speed} ${windUnit}</p>
</div>
<div
  class="w-full sm:flex sm:items-center gap-3"
>
  <p class="text-white/50 sm:mr-3">Humidity</p>
  <p id="hum-level">${humidity}%</p>
</div>`;
  return createEl(
    "div",
    text,
    `class="flex justify-evenly gap-4 mb-2 tracking-wider flex-wrap sm:flex-col sm:items-baseline"`
  );
};

//Display weekly weather
const createWeeklyHtml = (wfsect, iconSize, weatherObj) => {
  const num = 7;
  const dailyWeather = weatherObj.daily;
  let iconsArr = dailyWeather.map((day) => day.weather[0]);
  wfsect.innerHTML =
    createContent(num, "div", getDay(), getClasses(`class = text-tr`, num)) +
    createContent(num, "img", "", getIcon(iconsArr, iconSize, "w-24 m-auto")) +
    createContent(
      num,
      "span",
      getTemp(weatherObj, "min"),
      getClasses(' class="tracking-widest ml-2"', num)
    ) +
    createContent(
      num,
      "span",
      getTemp(weatherObj, "max"),
      getClasses(' class="tracking-widest ml-2"', num)
    );
};
const createContent = (num, type, text, attrArr) => {
  let html = "";
  for (let i = 0; i < num; i++) {
    html += createEl(type, text[i], attrArr[i]);
  }
  return html;
};
const getDay = () => {
  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const currentDay = new Date().getDay();
  const newDaysArr = [];
  for (let i = currentDay; i < days.length; i++) {
    newDaysArr.push(days[i]);
  }
  for (let i = 0; i < currentDay; i++) {
    newDaysArr.push(days[i]);
  }
  return newDaysArr;
};
const getIcon = (iconsArr, iconSize, classes) => {
  let attrArr = [];
  for (let i = 0; i < iconsArr.length; i++) {
    attrArr.push(
      `src = 'http://openweathermap.org/img/wn/${iconsArr[i].icon}${iconSize}.png' alt = '${iconsArr[i].description}' class = '${classes}'`
    );
  }
  return attrArr;
};
const getTemp = (weatherObj, range) => {
  const dailyWeather = weatherObj.daily;
  let tempArr = [];
  for (let i = 0; i < dailyWeather.length; i++) {
    tempArr.push(Math.round(weatherObj.daily[i].temp[range]) + " &deg;");
  }
  return tempArr;
};
const getClasses = (classes, num) => {
  let classesArr = [];
  for (let i = 0; i < num; i++) {
    classesArr.push(classes);
  }
  return classesArr;
};
//Display hourly weather
const createHourlyHtml = (hfsect, iconSize, locObj, weatherObj) => {
  hfsect.innerHTML = create12HoursHtml(0, 12, iconSize, weatherObj);
};
const create12HoursHtml = (iconNum, iconEnd, iconSize, weatherObj) => {
  const num = 12;
  const hourlyWeather = weatherObj.hourly;
  let iconsArr = [];
  for (let i = iconNum; i < iconEnd; i++) {
    iconsArr.push(hourlyWeather[i].weather[0]);
  }
  const hoursContent =
    createContent(
      num,
      "span",
      getHours(hourlyWeather),
      getClasses("class = text-tr", num)
    ) + createContent(num, "img", "", getIcon(iconsArr, iconSize, "h-16 w-16"));
  return createEl(
    "div",
    hoursContent,
    `class = "grid grid-cols-12 gap-x-4 font-['Out-fit'] text-center"`
  );
};
const getHours = (hourlyWeather) => {
  let hoursArr = [];
  let h = new Date().getHours();
  h = h > 12 ? h % 12 : h;
  let relay = "";
  hourlyWeather.forEach((hour) => (relay = hour.weather[0].icon.slice(2)));
  let ampm = relay === "d" ? "am" : "pm";
  let newH = 0;
  for (let i = 1; i < 13; i++) {
    newH = h + i;
    ampm = newH >= 12 ? "pm" : "am";
    if (newH > 12) {
      for (let j = 1; j < 13; j++) {
        newH = j;
        hoursArr.push(newH + ampm);
      }
    } else if (newH > 12) {
      ampm = relay === "d" ? "am" : "pm";
    } else {
      hoursArr.push(newH + ampm);
    }
  }
  return hoursArr;
};
