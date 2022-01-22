export class CurrentLocation {
  #name;
  #lat;
  #long;
  #unit;
  constructor() {
    this.#name = "Current Location";
    this.#lat = null;
    this.#long = null;
    this.#unit = "imperial";
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }
  getLat() {
    return this.#lat;
  }
  setLat(lat) {
    this.#lat = lat;
  }
  getLong() {
    return this.#long;
  }
  setLong(long) {
    this.#long = long;
  }
  setUnit(unit) {
    this.#unit = unit;
  }
  getUnit() {
    return this.#unit;
  }
  toggleUnit(unit) {
    this.#unit = unit === "imperial" ? "metric" : "imperial";
  }
}
export class Coords {
  constructor(name, lat, long, unit) {
    (this.name = name),
      (this.lat = lat),
      (this.long = long),
      (this.unit = unit ? unit : null);
  }
}
