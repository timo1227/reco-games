import { Games } from '@/types/Games'
import { GameCard } from '@/components/Games/GameCard/GameCard'
import {
  GameContainer,
  GameInnerContainer,
} from '@/components/Games/GameSection/GameContainers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard ',
}

interface FetchRAWGRes {
  next: string
  count: number
  results: Games[]
}

const getData = async (page: number) => {
  if (!process.env.RAWG_API_KEY) {
    throw new Error('No API key found for RAWG')
  }

  const url = 'https://api.rawg.io/api/games'

  const data = await fetch(
    url + '?key=' + process.env.RAWG_API_KEY + '&page=' + page,
    {
      cache: 'force-cache',
    }
  )
    .then((response) => {
      return response.json()
    })
    .then((data: FetchRAWGRes) => {
      return data
    })
    .catch((error) => {
      console.error(error)
      return null
    })

  return data
}
async function Page({ params }: { params: { page: number } }) {
  const page = params.page || 1
  const data = await getData(page)
  const games = data?.results || []
  return (
    <GameContainer>
      <GameInnerContainer>
        {games && games.map((game) => <GameCard key={game.id} game={game} />)}
      </GameInnerContainer>
    </GameContainer>
  )
}

export default Page
