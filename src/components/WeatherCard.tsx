import React, { useEffect, useState } from "react";
import { City } from "../types";
import { Weather, emptyWeather } from "../Weather";
import "../weather-card.css";

export function WeatherCard({ city }: { city: City }) {
  const [weather, setWeather] = useState<Weather>(emptyWeather);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.APPID}&units=metric`)
      .then((r) => r.json())
      .then((data) => setWeather(new Weather(data)));
  }, [city]);
  return (
    <div className={`weather-container ${weather.main}`}>
      <h3>{city.name} {process.env.APPID}</h3>
      <div className="details">
        <p className="temperature">{weather.temperature}</p>
        <div className="weather">
          <span>{weather.main}</span>
        </div>
      </div>
    </div>
  );
}
