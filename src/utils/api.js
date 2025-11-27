// src/utils/api.js
const BASE = "https://api.openweathermap.org/data/2.5";
const KEY = process.env.REACT_APP_OWM_API_KEY;

export async function fetchWeatherByCity(city) {
  if (!KEY) throw new Error("API key missing. Set REACT_APP_OWM_API_KEY in .env.local");
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}
