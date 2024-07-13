import { ThermometerSun } from "lucide-react"
import { useEffect, useState } from "react"
import AddCityForm from "./components/AddCityForm"
import WeatherDetails from "./components/WeatherDetails"
import { getCitiesFromStorage, saveCitiesToStorage } from "./services/storage"
import { useQueryClient } from "@tanstack/react-query"
import { getWeatherData } from "./services/weatherService"
import { useToast } from "./components/ui/use-toast"

const App: React.FC = () => {
  const [cities, setCities] = useState<string[]>(getCitiesFromStorage())

  const queryClient = useQueryClient()

  const { toast } = useToast()

  useEffect(() => {
    saveCitiesToStorage(cities.map((c) => c.toLowerCase()))
  }, [cities])

  const addCity = async (city: string) => {
    if (!cities.includes(city)) {
      try {
        await getWeatherData(city)
        const updatedCities = [city.toLowerCase(), ...cities]
        setCities(updatedCities)
        saveCitiesToStorage(updatedCities)
        queryClient.prefetchQuery({
          queryKey: ["weatherData", city],
          queryFn: () => getWeatherData(city),
        })
      } catch (error) {
        toast({
          title: "City not found",
          description: "Please enter a valid city name.",
          variant: "destructive",
          duration: 2000,
        })
      }
    }
  }

  const removeCity = (cityToRemove: string) => {
    if (cities.length === 1) return
    const updatedCities = cities.filter(
      (city) => city.toLowerCase() !== cityToRemove
    )
    setCities(updatedCities)
    saveCitiesToStorage(updatedCities)
    queryClient.removeQueries({ queryKey: ["weatherData", cityToRemove] })
  }

  return (
    <main className="h-full p-6 flex flex-col gap-2 items-center">
      <div className="flex justify-center items-center gap-2 m-1">
        <ThermometerSun className="w-8 h-8 text-white" />
        <h3 className="text-white text-2xl font-bold">ForecastHub</h3>
      </div>

      <AddCityForm addCity={addCity} />
      {cities.map((city) => (
        <WeatherDetails key={city} city={city} onRemoveCity={removeCity} />
      ))}
    </main>
  )
}

export default App
