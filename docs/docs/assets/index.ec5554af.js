var D = (e, t, n) => {
  if (!t.has(e)) throw TypeError("Cannot " + n);
};
var y = (e, t, n) => (
    D(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  L = (e, t, n) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  a = (e, t, n, s) => (
    D(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n
  );
const M = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === "childList")
        for (const c of r.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const r = {};
    return (
      o.integrity && (r.integrity = o.integrity),
      o.referrerpolicy && (r.referrerPolicy = o.referrerpolicy),
      o.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : o.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const r = n(o);
    fetch(o.href, r);
  }
};
M();
const b = "3b7063f28420455f0dbbd89456bd67d5",
  E = (e, t) => {
    let { name: n, lat: s, long: o, unit: r } = t;
    e.setName(n), e.setLat(s), e.setLong(o), r && e.setUnit(r);
  },
  T = (e) => e.replaceAll(/  {1,}/g, " ").trim(),
  W = async (e, t) => {
    let s = `https://api.openweathermap.org/data/2.5/weather?${
        /^\d+$/g.test(e) ? "zip" : "q"
      }=${e}&unit=${t}&appid=${b}`,
      o = encodeURI(s);
    return await fetch(o)
      .then((r) => r.json())
      .catch((r) => console.log(r));
  },
  P = async (e) => {
    const t = e.getLat(),
      n = e.getLong(),
      s = e.getUnit(),
      o = `https://api.openweathermap.org/data/2.5/onecall?lat=${t}&lon=${n}&exclude=minutely,alerts,&units=${s}&appid=${b}`;
    return await fetch(o)
      .then((r) => r.json())
      .catch((r) => console.log(r));
  },
  q = (e) => {
    e.placeholder =
      window.innerWidth < 400
        ? "City, State, Country"
        : "City, State, Country or Zip Code";
  },
  J = (e) => {
    const t = Array.from(e.classList),
      n = t.slice(0);
    n.splice(1, 2, "fa-circle-notch fa-spin text-tr"),
      k(e, n),
      setTimeout(() => k(e, t), 1e3);
  },
  k = (e, t) => {
    e.className = t.toString().replace(/[,]/g, " ");
  },
  $ = (e, t) => {
    x(e), w(t);
  },
  z = (e) => {
    const t = H(e.message);
    x(t), w(t);
  },
  H = (e) =>
    e
      .split(" ")
      .map((t) => t.slice(0, 1).toUpperCase() + t.slice(1))
      .join(" "),
  x = (e) => (document.getElementById("current-loc").textContent = e),
  w = (e) => (document.getElementById("confirmation").textContent = e),
  _ = (e, t, n, s, o) => {
    let r = window.innerWidth > 250 ? "@2x" : "";
    const c = e.querySelector("#current-forecast");
    A(e, n),
      K(c, n),
      Y(document.querySelector("main"), o),
      Z(e, c, r, s, o),
      ee(t, r, s, o),
      O(n, r, o),
      A(e, n);
  },
  A = (...e) => {
    e.forEach((t) => {
      t.classList.toggle("fade-in"), t.classList.toggle("invisible");
    });
  },
  K = (e, t) => {
    (e.innerHTML = ""), (t.innerHTML = "");
  },
  Y = (e, t) => {
    let n = parseInt(t.current.weather[0].icon.slice(0, 2)),
      s = t.current.weather[0].icon.slice(2),
      o = Array.from(e.classList)[0],
      c = R(n, {
        "01": "bg-sun",
        "02": "bg-partly-cloudy",
        "03": "bg-partly-cloudy",
        "04": "bg-clouds",
        "09": "bg-rain",
        10: "bg-rain",
        11: "bg-thunder",
        13: "bg-snow",
        50: "bg-fog",
      });
    s === "d" ? e.classList.replace(o, c) : e.classList.replace(o, "bg-night");
  },
  R = (e, t) => {
    for (const n in t) if (n == e) return t[n];
  },
  u = (e, t, ...n) => {
    const s = n.toString().replace(/[,]/g, " ");
    return t
      ? n
        ? `<${e} ${s}>${t}</${e}>`
        : `<${e}>${t}</${e}>`
      : `<${e} ${s}></${e}>`;
  },
  Z = (e, t, n, s, o) => {
    G(e, s);
    let r = V(o, n) + X(s, o);
    t.innerHTML = r;
  },
  G = (e, t) => {
    const n = t.getName().split(" "),
      s =
        n.indexOf("Lat:") !== -1
          ? `Lat: ${parseFloat(n[1]).toFixed(3)} , Long: ${parseFloat(
              n[3]
            ).toFixed(3)} `
          : t.getName();
    x(s), (e.querySelector("#date").textContent = Q());
  },
  Q = () => {
    let e = [
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
      ],
      t = new Date();
    return `${e[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`;
  },
  V = (e, t) => {
    const n = H(e.current.weather[0].description),
      s = e.current.weather[0].icon,
      o = u(
        "img",
        "",
        `src="http://openweathermap.org/img/wn/${s}${t}.png"`,
        'alt="partly-cloudy"',
        'class="m-auto h-[35vh]"'
      ),
      r = u("p", `${n}`, "class = 'text-center -mt-10 mb-6 tracking-wider'");
    return u("div", `${o} ${r}`);
  },
  X = (e, t) => {
    const n = Math.round(t.current.temp),
      s = e.getUnit() === "imperial" ? "&deg;F" : "&deg;C",
      o = e.getUnit() === "imperial" ? "mph" : "m/s",
      r = Math.round(t.current.feels_like),
      c = t.current.wind_speed,
      l = t.current.humidity;
    w(
      `The Temperture is ${n} ${s},wind speed is ${c} ${o} and humidity is ${l}% in ${e.getName()}`
    );
    const f = ` <div
  class="w-full sm:flex sm:justify-evenly sm:items-center text-center gap-3"
>
  <p class="text-white/50 sm:mr-3">Temp</p>
  <p id="temp-val">${n} ${s}</p>
</div>
<div
  class="w-full sm:flex sm:justify-evenly sm:items-center gap-3 text-center hidden"
>
  <p class="text-white/50 sm:mr-3">Feels Like</p>
  <p id="feels-val">${r} ${s}</p>
</div>
<div
  class="w-full sm:flex sm:justify-evenly sm:items-center text-center gap-3"
>
  <p class="text-white/50 sm:mr-3">Wind</p>
  <p id="wind-speed">${c} ${o}</p>
</div>
<div
  class="w-full sm:flex sm:items-center gap-3 text-center"
>
  <p class="text-white/50 sm:mr-3">Humidity</p>
  <p id="hum-level">${l}%</p>
</div>`;
    return u(
      "div",
      f,
      'class="flex justify-evenly gap-4 mb-2 tracking-wider flex-wrap sm:flex-col sm:items-baseline"'
    );
  },
  O = (e, t, n) => {
    const s = 7;
    let r = n.daily.map((c) => c.weather[0]);
    e.innerHTML =
      m(s, "div", j(), C("class = text-tr", s)) +
      m(s, "img", "", B(r, t, "w-24 m-auto")) +
      m(s, "span", N(n, "min"), C(' class="tracking-widest ml-2"', s)) +
      m(s, "span", N(n, "max"), C(' class="tracking-widest ml-2"', s));
  },
  m = (e, t, n, s) => {
    let o = "";
    for (let r = 0; r < e; r++) o += u(t, n[r], s[r]);
    return o;
  },
  j = () => {
    const e = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      t = new Date().getDay(),
      n = [];
    for (let s = t; s < e.length; s++) n.push(e[s]);
    for (let s = 0; s < t; s++) n.push(e[s]);
    return n;
  },
  B = (e, t, n) => {
    let s = [];
    for (let o = 0; o < e.length; o++)
      s.push(
        `src = 'http://openweathermap.org/img/wn/${e[o].icon}${t}.png' alt = '${e[o].description}' class = '${n}'`
      );
    return s;
  },
  N = (e, t) => {
    const n = e.daily;
    let s = [];
    for (let o = 0; o < n.length; o++)
      s.push(Math.round(e.daily[o].temp[t]) + " &deg;");
    return s;
  },
  C = (e, t) => {
    let n = [];
    for (let s = 0; s < t; s++) n.push(e);
    return n;
  },
  ee = (e, t, n, s) => {
    e.innerHTML = te(0, 12, t, s);
  },
  te = (e, t, n, s) => {
    const o = 12,
      r = s.hourly;
    let c = [];
    for (let f = e; f < t; f++) c.push(r[f].weather[0]);
    const l =
      m(o, "span", ne(r), C("class = text-tr", o)) +
      m(o, "img", "", B(c, n, "h-16 w-16"));
    return u(
      "div",
      l,
      `class = "grid grid-cols-12 gap-x-4 font-['Out-fit'] text-center"`
    );
  },
  ne = (e) => {
    let t = [],
      n = new Date().getHours();
    n = n > 12 ? n % 12 : n;
    let s = "";
    e.forEach((c) => (s = c.weather[0].icon.slice(2)));
    let o = s === "d" ? "am" : "pm",
      r = 0;
    for (let c = 1; c < 13; c++)
      if (((r = n + c), (o = r >= 12 ? "pm" : "am"), r > 12))
        for (let l = 1; l < 13; l++) (r = l), t.push(r + o);
      else r > 12 ? (o = s === "d" ? "am" : "pm") : t.push(r + o);
    return t;
  };
var g, p, h, d;
class se {
  constructor() {
    L(this, g, void 0);
    L(this, p, void 0);
    L(this, h, void 0);
    L(this, d, void 0);
    a(this, g, "Current Location"),
      a(this, p, null),
      a(this, h, null),
      a(this, d, "imperial");
  }
  getName() {
    return y(this, g);
  }
  setName(t) {
    a(this, g, t);
  }
  getLat() {
    return y(this, p);
  }
  setLat(t) {
    a(this, p, t);
  }
  getLong() {
    return y(this, h);
  }
  setLong(t) {
    a(this, h, t);
  }
  setUnit(t) {
    a(this, d, t);
  }
  getUnit() {
    return y(this, d);
  }
  toggleUnit(t) {
    a(this, d, t === "imperial" ? "metric" : "imperial");
  }
}
(g = new WeakMap()),
  (p = new WeakMap()),
  (h = new WeakMap()),
  (d = new WeakMap());
class S {
  constructor(t, n, s, o) {
    (this.name = t), (this.lat = n), (this.long = s), (this.unit = o || null);
  }
}
const oe = document.querySelectorAll("button"),
  re = document.getElementById("get-loc-btn"),
  ce = document.getElementById("home-loc-btn"),
  ie = document.getElementById("save-loc-btn"),
  ae = document.getElementById("toggle-units-btn"),
  le = document.getElementById("refresh-weather-btn"),
  de = document.getElementById("search-form"),
  I = document.getElementById("search-input"),
  ue = document.getElementById("current-forecast-sect"),
  me = document.getElementById("hourly-forecast-sect"),
  ge = document.getElementById("weekly-forecast-sect"),
  i = new se(),
  pe = () => {
    oe.forEach((e) =>
      e.addEventListener("click", () => J(e.querySelector(".fas")))
    ),
      de.addEventListener("submit", he),
      re.addEventListener("click", () => U()),
      ce.addEventListener("click", () => F()),
      ie.addEventListener("click", Le),
      ae.addEventListener("click", ve),
      le.addEventListener("click", () => v(i)),
      q(I),
      F();
  };
document.addEventListener("DOMContentLoaded", pe);
const he = async (e) => {
    e.preventDefault();
    let t = T(I.value);
    if (!t) return;
    const n = await W(t, i.getUnit());
    if (n)
      if (n.cod === 200) {
        const s = new S(
          n.sys.country ? `${n.name},${n.sys.country}` : n.name,
          n.coord.lat,
          n.coord.lon
        );
        E(i, s), v(i), (I.value = "");
      } else z(n);
    else $("Connection Error", "Connection Error");
  },
  U = () => {
    navigator.geolocation.getCurrentPosition(fe, ye);
  },
  fe = (e) => {
    const t = new S(
      `Lat: ${e.coords.latitude}, Long: ${e.coords.longitude}`,
      e.coords.latitude,
      e.coords.longitude
    );
    E(i, t), v(i);
  },
  ye = (e) => $(e.message, e.message),
  F = (e) => {
    let t = JSON.parse(localStorage.getItem("HomeLocation"));
    if (!t && !e) return U();
    if (!t && e.type === "click")
      $(
        "No Home Location Saved",
        "No Home Location Saved.Please Save a location first."
      );
    else {
      const n = new S(t.name, t.lat, t.long, t.unit);
      E(i, n), v(i);
    }
  },
  Le = () => {
    const e = {
      name: i.getName(),
      lat: i.getLat(),
      long: i.getLong(),
      unit: i.getUnit(),
    };
    localStorage.setItem("HomeLocation", JSON.stringify(e)),
      w(`${e.name} is saved as your home location.`);
  },
  ve = () => {
    i.toggleUnit(i.getUnit()), v(i);
  },
  v = async (e) => {
    const t = await P(e);
    console.log(t),
      t
        ? _(ue, me, ge, i, t)
        : $("Connection Error", "Connection Error: Data could not be fetched!");
  };
"serviceWorker" in navigator &&
  navigator.serviceWorker
    .register("../serviceWorker.js")
    .then(() => console.log("registered"))
    .catch((e) => console.log(e));
