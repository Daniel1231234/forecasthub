export interface WeatherData {
  cityName: string
  clouds: number
  coords: { lon: number; lat: number }
  temp: number
  minTemp: number
  maxTemp: number
  feelsLike: number
  weather: Weather[]
  windSpeed: number
  windDeg: number
  humidity: number
  pressure: number
  updatedAt: number
}

interface Weather {
  description: string
  icon: string
  id: number
  main: string
}

export interface ISuggestion {
  id: number | string
  name: string
  country: string
}
