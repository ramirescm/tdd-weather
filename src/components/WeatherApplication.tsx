import React, { useState } from "react";
import "../app.css";
import { City } from "../types";
import { Search } from "./Search";
import { WeatherCard } from "./WeatherCard";
import { createMockServer } from "../mock/createMockServer";

if (process.env.NODE_ENV === "development") {
  createMockServer();
}

function WeatherApplication() {
  const [selected, setSelected] = useState<City[]>([]);

  function selectCity(city: City): void {
    setSelected([city, ...selected]);
  }

  return (
    <div className="app">
      <h1>Weather Application</h1>

      <Search onSelectItem={selectCity} />

      <div data-testid="my-weather-list" className="cities-container">
        {selected.map((city) => (
          <WeatherCard
            key={`${city.lat}-${city.lon}`}
            city={city}
          ></WeatherCard>
        ))}
      </div>
    </div>
  );
}

export default WeatherApplication;
