import axios from 'axios'

import { GameCard } from '@/components/Games/GameCard/GameCard'

import { FetchGamesRes } from '../../layout'

const getRawGames = async () => {
  const games = axios
    .get<FetchGamesRes>('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
      },
    })
    .then((response) => {
      return response.data.results
    })
    .catch((error) => {
      console.log(error)
      return []
    })
  return games
}

export default async function Page() {
  const games = await getRawGames()

  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll px-5 scrollbar-hide'>
      <div className='game-cards items-start justify-center gap-6 md:grid lg:grid-cols-2 xl:grid-cols-3'>
        {games && games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  )
}
