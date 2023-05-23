import SuggestionService from '@/class/SuggestionService'
import { CanceledError } from 'axios'

import { SuggestionGames } from '@/types/Games'
import useGameContext from '@/hooks/useGameContext'

interface Props {
  gameID: string
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
  setSuggestions: (suggestions: SuggestionGames['games']) => void
}

export default function SuggestionsButton({
  gameID,
  setSuggestions,
  isLoading,
  setLoading,
}: Props) {
  const { games } = useGameContext()

  const handleSuggestionsClick = () => {
    setLoading(true)

    const { req, cancel } = SuggestionService.getSuggestions(games)
    req
      .then((res) => {
        setSuggestions(res.data.games)
        setLoading(false)
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          console.log('Request canceled', err.message)
          setLoading(false)
        }
      })

    return () => cancel
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
