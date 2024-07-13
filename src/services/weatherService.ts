import { WeatherData } from "@/types"
import axios from "axios"

export const getWeatherData = async (city: string) => {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const BASE_URL = "https://api.openweathermap.org/data/2.5"

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    })

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
    }

    return weatherData
  } catch (error) {
    throw new Error("City not found")
  }
}
