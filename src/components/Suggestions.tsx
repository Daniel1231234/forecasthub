import { ISuggestion } from "@/types"
import React from "react"
import { ScrollArea } from "./ui/scroll-area"

interface SuggestionsProps {
  suggestions: ISuggestion[]
  handleSubmit: (cityName: string) => void
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  handleSubmit,
}) => {
  return (
    <ScrollArea className="h-auto w-full rounded-md border">
      <ul className="z-10 list-none bg-white shadow-lg rounded-md max-h-60 overflow-auto mt-1 w-full">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-lg text-gray-800 flex justify-between items-center transition-colors duration-150 ease-in-out"
            onClick={() => handleSubmit(suggestion.name)}
          >
            <span> {suggestion.name}</span>
            <span className="text-sm text-gray-500">{suggestion.country}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

export default Suggestions
