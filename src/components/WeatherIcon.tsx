import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react"

const getWeatherIcon = (description?: string) => {
  if (!description) return <Cloud className="text-gray-300 w-24 h-24" />

  switch (true) {
    case description.includes("clear"):
      return <Sun className="text-yellow-400 w-24 h-24" />
    case description.includes("rain"):
      return <CloudRain className="text-blue-500 w-24 h-24" />
    case description.includes("clouds"):
      return <Cloud className="text-gray-400 w-24 h-24 " />
    case description.includes("snow"):
      return <CloudSnow className="text-white w-24 h-24" />
    default:
      return <Cloud className="text-gray-300 w-24 h-24" />
  }
}

export default getWeatherIcon
