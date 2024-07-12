import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchCities } from "@/services/citiesService"
import { ISuggestion } from "@/types"
import { useToast } from "./ui/use-toast"
import Suggestions from "./Suggestions"

interface IAddCityForm {
  addCity: (city: string) => void
}

const AddCityForm = ({ addCity }: IAddCityForm) => {
  const [city, setCity] = useState<string>("")

  const { toast } = useToast()

  const { data: suggestions = [], isFetching } = useQuery<ISuggestion[]>({
    queryKey: ["cities", city],
    queryFn: () => fetchCities(city),
    enabled: city.length > 2,
  })

  useEffect(() => {
    if (!isFetching && city.length > 2 && suggestions.length === 0) {
      const timer = setTimeout(() => {
        toast({
          title: "No cities found. Try another search.",
          variant: "destructive",
          duration: 2000,
        })
      }, 1000) 

      return () => clearTimeout(timer) 
    }
  }, [suggestions, isFetching, city, toast])

  
  const onChooseCity = (cityName: string) => {
    setCity("")
    addCity(cityName)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!city) return

    if (
      suggestions.some(
        (suggestion) => suggestion.name.toLowerCase() === city.toLowerCase()
      )
    ) {
      onChooseCity(city)
    } else {
      toast({
        title: "Please select a valid city from the suggestions.",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  return (
    <Card className="max-w-5xl w-full bg-[#BEF6EF] flex justify-evenly items-center">
      <CardContent className="w-full p-2">
        <form
          className="bg-transparent flex w-full justify-center items-center p-2 gap-2"
          onSubmit={onSubmit}
        >
          <Search className="w-7 h-7 ml-2" />
          <Input
            placeholder="Search city here"
            className="bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 text-gray-900 text-xl border-0"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
        {!isFetching && suggestions.length > 0 && (
          <Suggestions suggestions={suggestions} handleSubmit={onChooseCity} />
        )}
      </CardContent>
    </Card>
  )
}

export default AddCityForm
