import { ThermometerSun } from "lucide-react"
import { useEffect, useState } from "react"
import AddCityForm from "./components/AddCityForm"
import WeatherDetails from "./components/WeatherDetails"
import { getCitiesFromStorage, saveCitiesToStorage } from "./services/storage"
import { useQueryClient } from "@tanstack/react-query"
import { getWeatherData } from "./services/weatherService"

const App: React.FC = () => {
  const [cities, setCities] = useState<string[]>(getCitiesFromStorage())

  const queryClient = useQueryClient()

  const addCity = (city: string) => {
    if (!cities.includes(city)) {
      const updatedCities = [city, ...cities]
      setCities(updatedCities)
      saveCitiesToStorage(updatedCities)
      queryClient.prefetchQuery({
        queryKey: ["weatherData", city],
        queryFn: () => getWeatherData(city),
      })
    }
  }

  useEffect(() => {
    // Ensure cities are saved to storage when updated
    saveCitiesToStorage(cities)
  }, [cities])

  return (
    <main className="h-full p-6 flex flex-col gap-2 items-center">
      <div className="flex justify-center items-center gap-2 m-1">
        <ThermometerSun className="w-8 h-8 text-white" />
        <h3 className="text-white text-2xl font-bold">ForecastHub</h3>
      </div>

      <AddCityForm addCity={addCity} />
      {cities.map((city) => (
        <WeatherDetails key={city} city={city} />
      ))}
    </main>
  )
}

export default App
