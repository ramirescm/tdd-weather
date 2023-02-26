export class Weather {
  private readonly data: any;

  constructor(data: any) {
    this.data = data;
  }

  get temperature() {
    return `${this.data.main.temp.toFixed(1)}°` ?? "-/-";
  }

  get main() {
    const main = this.data.weather[0].main;
    return main === "-/-" ? "-/-" : main.toLowerCase();
  }
}
// AKA. Null Object Pattern
export const emptyWeather = new Weather({
  main: { temp: 0 },
  weather: [{ main: "-/-" }],
});
