import { render, screen } from "@testing-library/react";
import { Server } from "miragejs";
import { createMockServer } from "../mock/createMockServer";
import { WeatherCard } from "./WeatherCard";

describe("WeatherCard", () => {
  let server: Server;

  beforeEach(() => (server = createMockServer()));
  afterAll(() => server.shutdown());

  it("renders city name", () => {
    const city = {
      name: "Orlando",
      country: "US",
      state: "",
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    expect(screen.getByText(city.name)).toBeInTheDocument();
  });

  it("renders place holder when temperature is not available", () => {
    const city = {
      name: "Orlando com erro",
      country: "US",
      state: "",
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it("renders temperature", async () => {
    const city = {
      name: "Orlando",
      country: "US",
      state: "",
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    await screen.findByText("29.6°");
  });

  it("renders weather information", async () => {
    const city = {
      name: "Orlando",
      country: "US",
      state: "",
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    await screen.findByText('clear');
  });
});
