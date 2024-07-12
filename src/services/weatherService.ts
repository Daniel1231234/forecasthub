import { WeatherData } from "@/types"
import axios from "axios"

export const getWeatherData = async (city: string) => {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const BASE_URL = "https://api.openweathermap.org/data/2.5"

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  })

  console.log(response.data)

  const weatherData: WeatherData = {
    cityName: response.data.name,
    clouds: response.data.clouds.all,
    coords: response.data.coord,
    temp: response.data.main.temp,
    minTemp: response.data.main.temp_min,
    maxTemp: response.data.main.temp_max,
    feelsLike: response.data.main.feels_like,
    weather: response.data.weather,
    windSpeed: response.data.wind.speed,
    windDeg: response.data.wind.deg,
    humidity: response.data.main.humidity,
    pressure: response.data.main.pressure,
    updatedAt: Date.now(),
  }

  return weatherData
}

export function getNextSevenDays(): string[] {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const next7Days = []
  for (let i = 0; i < 7; i++) {
    next7Days.push(
      days[new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).getDay()]
    )
  }
  return next7Days
}

export enum TempUnit {
  CELCIUS,
  FAHRENHEIT,
}

export function kelvinToCelcius(num: number) {
  return Math.round(num - 273.15)
}

export function celciusToFahrenheit(c: number) {
  return Math.round(c * (9 / 5) + 32)
}

export function fahrenheitToCelcius(f: number) {
  return Math.round(((f - 32) * 5) / 9)
}

export function kmToMile(n: number) {
  return Math.round(n / 1.60934)
}

export function mileToKm(n: number) {
  return Math.round(n * 1.60934)
}
