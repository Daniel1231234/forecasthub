import { Sun, Wind, Droplet, BarChart2 } from "lucide-react"
import { useWeatherData } from "@/hooks/useWeatherData"
import getWeatherIcon from "./WeatherIcon"
import { Skeleton } from "./ui/skeleton"

interface WeatherDetailsProps {
  city: string
}

const WeatherDetails = ({ city }: WeatherDetailsProps) => {
  const { data: weatherData, isError, isLoading } = useWeatherData(city)

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-4 p-4 bg-blue-100 rounded-lg shadow-md flex justify-between items-center animate-pulse">
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>
    )
  }

  if (isError) {
    return <p>Error fetching data</p>
  }

  const updatedAt = new Date(weatherData?.updatedAt).toLocaleTimeString()

  const weatherIcon = getWeatherIcon(weatherData?.weather[0].description)

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 p-4 bg-blue-100 rounded-lg shadow-md flex justify-between items-center">
      <div className="text-center flex flex-col gap-6 items-center justify-center w-1/2">
        <h3 className="text-2xl font-bold text-gray-700">
          {weatherData?.cityName}
        </h3>
        <div className="flex items-center justify-center gap-9">
          {weatherIcon}
          <p className="text-6xl font-light text-gray-700">
            {weatherData?.temp.toFixed(1)}°
          </p>
        </div>
        <p className="text-lg text-gray-600">
          {weatherData?.weather[0].description}
        </p>
      </div>
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-center">
          <Sun className="text-yellow-400 w-10 h-10" />
          <p className="text-2xl font-semibold ml-2">
            Feels like {weatherData?.feelsLike.toFixed(1)}°
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center">
            <Droplet className="text-blue-300 w-6 h-6" />
            <p className="ml-2">Humidity: {weatherData?.humidity}%</p>
          </div>
          <div className="flex items-center">
            <Wind className="text-gray-400 w-6 h-6" />
            <p className="ml-2">Wind: {weatherData?.windSpeed} km/h</p>
          </div>
          <div className="flex items-center">
            <BarChart2 className="text-green-500 w-6 h-6" />
            <p className="ml-2">Pressure: {weatherData?.pressure} hPa</p>
          </div>
          <small>Last update: {updatedAt}</small>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails
