import { useState } from 'react'

interface Props {
  gameID: string
  setSuggestions: (suggestions) => void
}

export default function SuggestionsButton({ gameID, setSuggestions }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSuggestionsClick = () => {
    const getSuggestions = async () => {
      if (isLoading) return
      setIsLoading(true)
      const res = await fetch('/api/openAi', {
        method: 'POST',
        body: JSON.stringify({
          gameID,
        }),
      })
      const data = await res.json()
      setIsLoading(false)
      if (res.ok) {
        setSuggestions(data.games)
      }
    }
    getSuggestions()
  }

  return (
    <div className='flex justify-center'>
      <button
        className='rounded border-2 border-black bg-white px-4 py-2 text-black transition hover:cursor-pointer hover:bg-slate-200 dark:border-white dark:bg-black/60 dark:text-white dark:hover:bg-black/50'
        onClick={() => handleSuggestionsClick()}
      >
        {isLoading ? 'Loading...' : 'Get Suggestions'}
      </button>
    </div>
  )
}
