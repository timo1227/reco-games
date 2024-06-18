'use client'

import GameProvider from '@/context/GameContext'
import { useSession } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export default function GamesProvider({ children }: Props) {
  return <GameProvider>{children}</GameProvider>
}
