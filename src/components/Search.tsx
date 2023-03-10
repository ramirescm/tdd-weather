import React, { ChangeEvent, useState } from "react";
import { City } from "../types";

import "./search.css";

export const Search = ({
  onSelectItem,
}: {
  onSelectItem: (city: City) => void;
}) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.APPID}`)
      .then((r) => r.json())
      .then((cities) => {
        setSearchResults(
          cities.map((city: any) => ({
            name: city.name,
            state: city.state,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
          }))
        );
      });
  };

  const onSelect = (city: City) =>{
    onSelectItem(city);
    setSearchResults([]);
  }

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          data-testid="search-input"
          onChange={handleChange}
          placeholder="Enter city name (e.g. Orlando, New York)"
        />
        <button data-testid="search-button" onClick={handleClick} className="search-button">
          Search
        </button>
      </div>

      {Boolean(searchResults?.length) && (
        <div data-testid="search-results" className="search-results">
          {searchResults?.map((city) => {
            return (
              <div
                className="search-result"
                key={`${city.lat}-${city.lon}`}
                onClick={() => onSelect(city)}
              >
                <span className="city-name">{city.name}</span>
                <span className="city-location">
                  {city.lat}, {city.lon}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
