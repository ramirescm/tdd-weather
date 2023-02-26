import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import WeatherApplication from "./WeatherApplication";
import { Server } from "miragejs";
import userEvent from "@testing-library/user-event";
import { createMockServer } from "../mock/createMockServer";

describe("Weather Application", () => {
  let server: Server;

  beforeEach(() => (server = createMockServer()));
  afterAll(() => server.shutdown());

  it("renders weather application", () => {
    render(<WeatherApplication />);
    const title = screen.getByText(/Weather Application/i);
    expect(title).toBeInTheDocument();
  });

  it("show search results", async () => {
    render(<WeatherApplication />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Orlando");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Orlando/i).length).toEqual(4)
    );
  });

  it("show results details", async () => {
    render(<WeatherApplication />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Orlando");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Orlando/i).length).toEqual(4)
    );

    expect(screen.getByText(/38.8712074, -80.5937044/i)).toBeInTheDocument();
  });

  it("add search result to my weather list", async () => {
    render(<WeatherApplication />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Orlando");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Orlando/i).length).toEqual(4)
    );

    const selected = screen.getAllByText(/Orlando/i)[2];
    userEvent.click(selected);

    await waitFor(() => {
      expect(
        within(screen.getByTestId("my-weather-list")).getByText(/Orlando/i)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
    });
  });
});
