import { Sun, Wind, Droplet, BarChart2, X } from "lucide-react"
import { useWeatherData } from "@/hooks/useWeatherData"
import getWeatherIcon from "./WeatherIcon"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"

interface WeatherDetailsProps {
  city: string
  onRemoveCity: (city: string) => void
}

const WeatherDetails = ({ city, onRemoveCity }: WeatherDetailsProps) => {
  const {
    data: weatherData,
    isError,
    isLoading,
    refetch,
  } = useWeatherData(city)

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-4 p-4 bg-blue-100 rounded-lg shadow-md flex justify-between items-center animate-pulse">
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>
    )
  }

  if (isError) {
    console.error("Error fetching weather data")
    return (
      <div className="text-center p-4">
        <p>
          Could not fetch the weather data. Please check your connection or try
          again later.
        </p>
        <button
          onClick={() => refetch()} // Wrapping refetch in an arrow function
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!weatherData) {
    return <p>No data available for this city.</p>
  }

  const updatedAt = new Date(weatherData.updatedAt).toLocaleTimeString()

  const weatherIcon = getWeatherIcon(weatherData?.weather[0].description)

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 p-4 bg-blue-100 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center relative">
      <div className="text-center flex flex-col gap-6 items-center justify-center w-full md:w-1/2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-700">
          {weatherData?.cityName}
        </h3>
        <div className="flex items-center justify-center gap-4 md:gap-9">
          {weatherIcon}
          <p className="text-4xl md:text-6xl font-light text-gray-700">
            {weatherData?.temp.toFixed(1)}°
          </p>
        </div>
        <p className="text-base md:text-lg text-gray-600">
          {weatherData?.weather[0].description}
        </p>
      </div>
      <div className="flex-1 flex flex-col space-y-2 md:space-y-4">
        <div className="flex items-center justify-center">
          <Sun className="text-yellow-400 w-8 md:w-10 h-8 md:h-10" />
          <p className="text-xl md:text-2xl font-semibold ml-2">
            Feels like {weatherData?.feelsLike.toFixed(1)}°
          </p>
        </div>
        <div className="flex flex-col items-center space-y-1 md:space-y-2">
          <div className="flex items-center">
            <Droplet className="text-blue-300 w-5 md:w-6 h-5 md:h-6" />
            <p className="text-sm md:text-base ml-2">
              Humidity: {weatherData?.humidity}%
            </p>
          </div>
          <div className="flex items-center">
            <Wind className="text-gray-400 w-5 md:w-6 h-5 md:h-6" />
            <p className="text-sm md:text-base ml-2">
              Wind: {weatherData?.windSpeed} km/h
            </p>
          </div>
          <div className="flex items-center">
            <BarChart2 className="text-green-500 w-5 md:w-6 h-5 md:h-6" />
            <p className="text-sm md:text-base ml-2">
              Pressure: {weatherData?.pressure} hPa
            </p>
          </div>
          <small className="text-xs md:text-sm text-green-400">
            Last update: {updatedAt}
          </small>
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => onRemoveCity(city)}
        className=" absolute top-2 right-2"
      >
        <X />
      </Button>
    </div>
  )
}

export default WeatherDetails
