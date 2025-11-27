// src/App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherByCity } from "./utils/api";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setError("");
    setLoading(true);
    setWeather(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1>Weather Report</h1>
        <div className="credits">Data: OpenWeatherMap</div>
      </header>

      <main className="main">
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading…</p>}
        {error && <p className="error">Error: {error}</p>}
        {weather && <WeatherCard data={weather} />}
        <section style={{ marginTop: 20 }}>
          <p style={{ color: "#666", fontSize: 14 }}>
            Tip: Search by city name (e.g., "Toronto" or "London,uk").
          </p>
        </section>
      </main>

      <footer className="footer">
        <small>Built for COMP3123 Lab Test 2</small>
      </footer>
    </div>
  );
}

export default App;
