export type CurrentWeatherData  = {
  dt: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  dew_point: number;
  weather: [
    {
      id: number;
      main: string;
      icon: string;
      description: string;
    }
  ],
  temp: number;
  visibility: number;
  pressure: number;
}

export type DailyWeatherData = {
  dt: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: [
    {
      id: number;
      main: string;
      icon: string;
      description: string;
    }
  ],
  temp: {
    day: number;
    min: number;
    max: number;
  };
}