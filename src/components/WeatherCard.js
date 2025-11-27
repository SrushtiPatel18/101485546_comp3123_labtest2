import React from "react";

function unixToTime(ts, tzOffset=0) {
  const d = new Date((ts + tzOffset) * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function WeatherCard({ data }) {
  if (!data) return null;
  const { name, sys, main, weather, wind, coord, timezone } = data;
  const w = weather?.[0];
  const iconUrl = w ? `http://openweathermap.org/img/wn/${w.icon}@2x.png` : "";

  return (
    <div style={{
      maxWidth: 520,
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      background: "linear-gradient(180deg,#ffffff,#f7fbff)"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>{name}, {sys?.country}</h2>
          <p style={{ margin: 0, color: "#555" }}>{w?.main} — {w?.description}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 40, fontWeight: 600 }}>{Math.round(main.temp)}°C</div>
          <div style={{ color: "#777" }}>Feels like {Math.round(main.feels_like)}°C</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 14, alignItems: "center" }}>
        {iconUrl && <img src={iconUrl} alt={w?.description} />}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(120px,1fr))", gap: 8, width: "100%" }}>
          <div>Humidity: <strong>{main.humidity}%</strong></div>
          <div>Wind: <strong>{wind.speed} m/s</strong></div>
          <div>Pressure: <strong>{main.pressure} hPa</strong></div>
          <div>Coordinates: <strong>{coord.lat.toFixed(2)}, {coord.lon.toFixed(2)}</strong></div>
        </div>
      </div>

      <div style={{ marginTop: 14, color: "#555" }}>
        Sunrise: <strong>{unixToTime(sys.sunrise, timezone)}</strong> • Sunset: <strong>{unixToTime(sys.sunset, timezone)}</strong>
      </div>
    </div>
  );
}
