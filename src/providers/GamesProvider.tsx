'use client'

import GameProvider from '@/context/GameContext'

interface Props {
  children: React.ReactNode
}

export default function GamesProvider({ children }: Props) {
  return <GameProvider>{children}</GameProvider>
}
