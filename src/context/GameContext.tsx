import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

import { Games } from '@/types/Games'

interface GameContextType {
  games: Games[]
  setGames: React.Dispatch<React.SetStateAction<any>>
  loading: boolean
}

interface UserGameCollection {
  _id: string
  games: Games[]
}

export const GameContext = createContext<GameContextType>(null!)

export default function GameProvider({
  gamesID,
  children,
}: {
  children: React.ReactNode
  gamesID: string
}) {
  const [games, setGames] = useState<GameContextType['games']>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get<UserGameCollection>(`/api/games/${gamesID}`)
      .then((res) => {
        setGames(res.data.games)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [gamesID])

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
