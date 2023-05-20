import { createContext, useEffect, useState } from 'react'
import { GamesType } from 'Games'
import axios from 'axios'

interface GameContextType {
  games: GamesType
  setGames: React.Dispatch<React.SetStateAction<any>>
}

interface UserGameCollection {
  _id: string
  games: GamesType
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

  useEffect(() => {
    axios
      .get<UserGameCollection>(`/api/games/${gamesID}`)
      .then((res) => {
        setGames(res.data.games)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [gamesID])

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
