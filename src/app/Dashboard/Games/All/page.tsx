import axios from 'axios'

import { GameCard } from '@/components/Games/GameCard/GameCard'
import {
  GameContainer,
  GameInnerContainer,
} from '@/components/Games/GameSection/GameContainers'

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
    <GameContainer>
      <GameInnerContainer>
        {games && games.map((game) => <GameCard key={game.id} game={game} />)}
      </GameInnerContainer>
    </GameContainer>
  )
}
