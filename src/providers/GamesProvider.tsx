'use client'

import GameProvider from '@/context/GameContext'

interface Props {
  children: React.ReactNode
  gamesID: string
}

export default function GamesProvider({ children, gamesID }: Props) {
  return <GameProvider gamesID={gamesID}>{children}</GameProvider>
}
