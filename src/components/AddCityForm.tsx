import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import { fetchCities } from "@/services/citiesService"
import { ISuggestion, WeatherData } from "@/types"
import { useToast } from "./ui/use-toast"
import Suggestions from "./Suggestions"

interface IAddCityForm {
  addCity: (city: string) => void
}

const AddCityForm = ({ addCity }: IAddCityForm) => {
  const [city, setCity] = useState<string>("")
  const [debouncedCity] = useDebounce(city, 500)

  const { toast } = useToast()

  const { data: suggestions = [], isFetching } = useQuery<ISuggestion[]>({
    queryKey: ["cities", debouncedCity],
    queryFn: () => fetchCities(debouncedCity),
    enabled: debouncedCity.length > 2,
    retryOnMount: false,
  })

  useEffect(() => {
    if (!isFetching && debouncedCity.length > 2 && suggestions.length === 0) {
      toast({
        title: "No cities found. Try another search.",
        variant: "destructive",
        duration: 2000,
      })
    }
  }, [suggestions, isFetching, debouncedCity])

  const handleSubmit = (cityName: string) => {
    setCity("")

    addCity(cityName)
  }

  return (
    <Card className="max-w-5xl w-full bg-[#BEF6EF] flex justify-evenly items-center">
      <CardContent className="w-full p-2">
        <div className="bg-transparent flex w-full justify-center items-center p-2 gap-2">
          <Search className="w-7 h-7 ml-2" />
          <Input
            placeholder="Search city here"
            className="bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 text-gray-900 text-xl border-0"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {!isFetching && suggestions.length > 0 && (
          <Suggestions suggestions={suggestions} handleSubmit={handleSubmit} />
        )}
      </CardContent>
    </Card>
  )
}

export default AddCityForm
