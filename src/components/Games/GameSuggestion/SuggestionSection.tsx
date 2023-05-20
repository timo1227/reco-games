import { useState } from 'react'

import SuggestionsButton from './SuggestionButton'

interface SuggestionGames {
  games: {
    description: string
    name: string
    reason: string
  }[]
}

export default function SuggestionSection({ gameID }: { gameID: string }) {
  const [suggestions, setSuggestions] = useState<SuggestionGames['games']>([])

  // useEffect(() => {
  //   const getSuggestedGames = async () => {
  //     const res = await fetch("/api/SuggestedGames", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         gameID,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setGames(data.games);
  //     }
  //   };
  //   getSuggestedGames();
  // }, []);

  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll px-5 scrollbar-hide'>
      {/* Top right of the container put Suggestion Button */}
      <div className='flex justify-end'>
        <SuggestionsButton
          gameID={gameID}
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
            <li key={game.name} className='mb-5 flex flex-col items-center'>
              <h2 className='mb-5 text-4xl font-bold'>{game.name}</h2>
              <caption className='mb-3 flex flex-wrap text-left'>
                <p className='font-bold'>Description: </p> {game.description}
              </caption>
              <p>
                <p className='font-bold'>Why to play? : </p> {game.reason}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
