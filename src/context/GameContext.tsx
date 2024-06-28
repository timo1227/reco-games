import { createContext, useEffect, useState } from 'react'
import { getGames } from '@/actions/game'
import { useSession } from 'next-auth/react'

import { Games } from '@/types/Games'

interface GameContextType {
  gameList: Games[]
  setGameList: React.Dispatch<React.SetStateAction<Games[]>>
  loading: boolean
}

export const GameContext = createContext<GameContextType>(null!)

export default function GameProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [gameList, setGameList] = useState<GameContextType['gameList']>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const { data: session, status } = useSession()

  if (!session && status !== 'loading') {
    throw new Error('Session not found')
  }

  useEffect(() => {
    getGames()
      .then((games) => {
        setGameList(games)
      })
      .catch((error) => {
        console.error(error)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <GameContext.Provider
      value={{
        gameList,
        setGameList,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
