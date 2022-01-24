const API_KEY = "3b7063f28420455f0dbbd89456bd67d5";
export const setLocation = (loc, coords) => {
  let { name, lat, long, unit } = coords;
  loc.setName(name);
  loc.setLat(lat);
  loc.setLong(long);
  if (unit) {
    loc.setUnit(unit);
  }
};
export const analyzeText = (text) => {
  return text.replaceAll(/  {1,}/g, " ").trim();
};
export const getCoords = async (text, units) => {
  let flag = /^\d+$/g.test(text) ? "zip" : "q";
  let url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${text}&unit=${units}&appid=${API_KEY}`;
  let encodedUrl = encodeURI(url);
  return await fetch(encodedUrl)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const getWeather = async (location) => {
  const lat = location.getLat();
  const lon = location.getLong();
  const units = location.getUnit();
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,&units=${units}&appid=${API_KEY}`;
  return await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
