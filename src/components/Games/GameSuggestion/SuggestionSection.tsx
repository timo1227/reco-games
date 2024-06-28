import { useState } from 'react'

import { SuggestionGames } from '@/types/Games'

import SuggestionsButton from './SuggestionButton'

export default function SuggestionSection({ gameID }: { gameID: string }) {
  const [suggestions, setSuggestions] = useState<SuggestionGames['games']>([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='dashboard-inner size-full overflow-y-scroll px-5 scrollbar-hide'>
      {/* Top right of the container put Suggestion Button */}
      <div className='flex justify-end'>
        <SuggestionsButton
          gameID={gameID}
          isLoading={isLoading}
          setLoading={(isLoading) => setIsLoading(isLoading)}
          setSuggestions={(suggestions) => setSuggestions(suggestions)}
        />
      </div>
      <div className='game-cards flex flex-col gap-10 md:flex-wrap'>
        {suggestions.length === 0 && (
          <p className='text-cent w-full text-4xl font-bold'>
            Get Suggestions!
          </p>
        )}
        <ol className='list-decimal'>
          {suggestions.map((game) => (
            <li key={game.name} className='mb-5 flex flex-col'>
              <h2 className='mb-5 text-center text-4xl font-bold'>
                {game.name}
              </h2>
              <div className='mb-3 flex flex-wrap text-left'>
                <p className='font-bold'>Description: </p> {game.description}
              </div>
              <div>
                <p className='font-bold'>Why to play? : </p> {game.reason}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
