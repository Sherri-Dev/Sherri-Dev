var I = (e, t, n) => {
  if (!t.has(e)) throw TypeError("Cannot " + n);
};
var g = (e, t, n) => (
    I(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  p = (e, t, n) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  i = (e, t, n, s) => (
    I(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n
  );
const M = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === "childList")
        for (const a of r.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
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
const D = "3b7063f28420455f0dbbd89456bd67d5",
  v = (e, t) => {
    let { name: n, lat: s, long: o, unit: r } = t;
    e.setName(n), e.setLat(s), e.setLong(o), r && e.setUnit(r);
  },
  T = (e) => e.replaceAll(/  {1,}/g, " ").trim(),
  H = async (e, t) => {
    let s = `https://api.openweathermap.org/data/2.5/weather?${
        /^\d+$/g.test(e) ? "zip" : "q"
      }=${e}&unit=${t}&appid=${D}`,
      o = encodeURI(s);
    return await fetch(o)
      .then((r) => r.json())
      .catch((r) => console.log(r));
  },
  W = async (e) => {
    const t = e.getLat(),
      n = e.getLong(),
      s = e.getUnit(),
      o = `https://api.openweathermap.org/data/2.5/onecall?lat=${t}&lon=${n}&exclude=minutely,hourly,alerts,&units=${s}&appid=${D}`;
    return await fetch(o)
      .then((r) => r.json())
      .catch((r) => console.log(r));
  },
  P = (e) => {
    e.placeholder =
      window.innerWidth < 400
        ? "City, State, Country"
        : "City, State, Country or Zip Code";
  },
  q = (e) => {
    const t = Array.from(e.classList),
      n = t.slice(0);
    n.splice(1, 2, "fa-circle-notch fa-spin text-tr"),
      b(e, n),
      setTimeout(() => b(e, t), 1e3);
  },
  b = (e, t) => {
    e.className = t.toString().replace(/[,]/g, " ");
  },
  f = (e, t) => {
    w(e), L(t);
  },
  J = (e) => {
    const t = k(e.message);
    w(t), L(t);
  },
  k = (e) =>
    e
      .split(" ")
      .map((t) => t.slice(0, 1).toUpperCase() + t.slice(1))
      .join(" "),
  w = (e) => (document.getElementById("current-loc").textContent = e),
  L = (e) => (document.getElementById("confirmation").textContent = e),
  _ = (e, t, n, s) => {
    let o = window.innerWidth > 250 ? "@2x" : "";
    const r = e.querySelector("#current-forecast");
    A(e, t),
      z(r, t),
      K(document.querySelector("main"), s),
      R(e, r, o, n, s),
      X(t, o, s),
      A(e, t);
  },
  A = (...e) => {
    e.forEach((t) => {
      t.classList.toggle("fade-in"), t.classList.toggle("invisible");
    });
  },
  z = (e, t) => {
    (e.innerHTML = ""), (t.innerHTML = "");
  },
  K = (e, t) => {
    let n = parseInt(t.current.weather[0].icon.slice(0, 2)),
      s = t.current.weather[0].icon.slice(2),
      o = Array.from(e.classList)[0],
      a = Y(n, {
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
    s === "d" ? e.classList.replace(o, a) : e.classList.replace(o, "bg-night");
  },
  Y = (e, t) => {
    for (const n in t) if (n == e) return t[n];
  },
  h = (e, t, ...n) => {
    const s = n.toString().replace(/[,]/g, " ");
    return t
      ? n
        ? `<${e} ${s}>${t}</${e}>`
        : `<${e}>${t}</${e}>`
      : `<${e} ${s}></${e}>`;
  },
  R = (e, t, n, s, o) => {
    Z(e, s);
    let r = Q(o, n) + V(s, o);
    t.innerHTML = r;
  },
  Z = (e, t) => {
    const n = t.getName().split(" "),
      s =
        n.indexOf("Lat:") !== -1
          ? `Lat: ${parseFloat(n[1]).toFixed(3)} , Long: ${parseFloat(
              n[3]
            ).toFixed(3)} `
          : t.getName();
    w(s), (e.querySelector("#date").textContent = G());
  },
  G = () => {
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
  Q = (e, t) => {
    const n = k(e.current.weather[0].description),
      s = e.current.weather[0].icon,
      o = h(
        "img",
        "",
        `src="http://openweathermap.org/img/wn/${s}${t}.png"`,
        'alt="partly-cloudy"',
        'class="m-auto h-[35vh]"'
      ),
      r = h("p", `${n}`, "class = 'text-center -mt-10 mb-6 tracking-wider'");
    return h("div", `${o} ${r}`);
  },
  V = (e, t) => {
    const n = Math.round(t.current.temp),
      s = e.getUnit() === "imperial" ? "&deg;F" : "&deg;C",
      o = e.getUnit() === "imperial" ? "mph" : "m/s",
      r = Math.round(t.current.feels_like),
      a = t.current.wind_speed,
      S = t.current.humidity;
    L(
      `The Temperture is ${n} ${s},wind speed is ${a} ${o} and humidity is ${S}% in ${e.getName()}`
    );
    const F = ` <div
  class="w-full sm:flex sm:items-center gap-3 text-center"
>
  <p class="text-white/50 sm:mr-3">Temp</p>
  <p id="temp-val">${n} ${s}</p>
</div>
<div
  class="w-full sm:flex sm:items-center gap-3 text-center hidden"
>
  <p class="text-white/50 sm:mr-3">Feels Like</p>
  <p id="feels-val">${r} ${s}</p>
</div>
<div
  class="w-full sm:flex sm:items-center gap-3 text-center"
>
  <p class="text-white/50 sm:mr-3">Wind</p>
  <p id="wind-speed">${a} ${o}</p>
</div>
<div
  class="w-full sm:flex sm:items-center gap-3 text-center"
>
  <p class="text-white/50 sm:mr-3">Humidity</p>
  <p id="hum-level">${S}%</p>
</div>`;
    return h(
      "div",
      F,
      'class="flex justify-evenly gap-4 mb-2 tracking-wider flex-wrap sm:flex-col sm:items-baseline"'
    );
  },
  X = (e, t, n) => {
    const s = 7;
    e.innerHTML =
      $(s, "div", O(), C("class = text-tr", s)) +
      $(s, "img", "", j(n, t)) +
      $(s, "small", B(n, "min"), C(' class="tracking-widest ml-2"', s)) +
      $(s, "small", B(n, "max"), C(' class="tracking-widest ml-2"', s));
  },
  $ = (e, t, n, s) => {
    let o = "";
    for (let r = 0; r < e; r++) o += h(t, n[r], s[r]);
    return o;
  },
  O = () => {
    const e = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      t = new Date().getDay(),
      n = [];
    for (let s = t; s < e.length; s++) n.push(e[s]);
    for (let s = 0; s < t; s++) n.push(e[s]);
    return n;
  },
  j = (e, t) => {
    let s = e.daily.map((r) => r.weather[0]),
      o = [];
    for (let r = 0; r < s.length; r++)
      o.push(
        `src = 'http://openweathermap.org/img/wn/${s[r].icon}${t}.png' alt = '${s[r].description}' class = 'w-24 m-auto'`
      );
    return o;
  },
  B = (e, t) => {
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
  };
var d, u, m, l;
class ee {
  constructor() {
    p(this, d, void 0);
    p(this, u, void 0);
    p(this, m, void 0);
    p(this, l, void 0);
    i(this, d, "Current Location"),
      i(this, u, null),
      i(this, m, null),
      i(this, l, "imperial");
  }
  getName() {
    return g(this, d);
  }
  setName(t) {
    i(this, d, t);
  }
  getLat() {
    return g(this, u);
  }
  setLat(t) {
    i(this, u, t);
  }
  getLong() {
    return g(this, m);
  }
  setLong(t) {
    i(this, m, t);
  }
  setUnit(t) {
    i(this, l, t);
  }
  getUnit() {
    return g(this, l);
  }
  toggleUnit(t) {
    i(this, l, t === "imperial" ? "metric" : "imperial");
  }
}
(d = new WeakMap()),
  (u = new WeakMap()),
  (m = new WeakMap()),
  (l = new WeakMap());
class E {
  constructor(t, n, s, o) {
    (this.name = t), (this.lat = n), (this.long = s), (this.unit = o || null);
  }
}
const te = document.querySelectorAll("button"),
  ne = document.getElementById("get-loc-btn"),
  se = document.getElementById("home-loc-btn"),
  oe = document.getElementById("save-loc-btn"),
  re = document.getElementById("toggle-units-btn"),
  ce = document.getElementById("refresh-weather-btn"),
  ie = document.getElementById("search-form"),
  x = document.getElementById("search-input"),
  ae = document.getElementById("current-forecast-sect"),
  le = document.getElementById("weekly-forecast-sect"),
  c = new ee(),
  de = () => {
    te.forEach((e) =>
      e.addEventListener("click", () => q(e.querySelector(".fas")))
    ),
      ie.addEventListener("submit", ue),
      ne.addEventListener("click", () => N()),
      se.addEventListener("click", () => U()),
      oe.addEventListener("click", pe),
      re.addEventListener("click", he),
      ce.addEventListener("click", () => y(c)),
      P(x),
      U();
  };
document.addEventListener("DOMContentLoaded", de);
const ue = async (e) => {
    e.preventDefault();
    let t = T(x.value);
    if (!t) return;
    const n = await H(t, c.getUnit());
    if (n)
      if (n.cod === 200) {
        const s = new E(
          n.sys.country ? `${n.name},${n.sys.country}` : n.name,
          n.coord.lat,
          n.coord.lon
        );
        v(c, s), y(c), (x.value = "");
      } else J(n);
    else f("Connection Error", "Connection Error");
  },
  N = () => {
    navigator.geolocation.getCurrentPosition(me, ge);
  },
  me = (e) => {
    const t = new E(
      `Lat: ${e.coords.latitude}, Long: ${e.coords.longitude}`,
      e.coords.latitude,
      e.coords.longitude
    );
    v(c, t), y(c);
  },
  ge = (e) => f(e.message, e.message),
  U = (e) => {
    let t = JSON.parse(localStorage.getItem("HomeLocation"));
    if (!t && !e) return N();
    if (!t && e.type === "click")
      f(
        "No Home Location Saved",
        "No Home Location Saved.Please Save a location first."
      );
    else {
      const n = new E(t.name, t.lat, t.long, t.unit);
      v(c, n), y(c);
    }
  },
  pe = () => {
    const e = {
      name: c.getName(),
      lat: c.getLat(),
      long: c.getLong(),
      unit: c.getUnit(),
    };
    localStorage.setItem("HomeLocation", JSON.stringify(e)),
      L(`${e.name} is saved as your home location.`);
  },
  he = () => {
    c.toggleUnit(c.getUnit()), y(c);
  },
  y = async (e) => {
    const t = await W(e);
    console.log(t),
      t
        ? _(ae, le, c, t)
        : f("Connection Error", "Connection Error: Data could not be fetched!");
  };
