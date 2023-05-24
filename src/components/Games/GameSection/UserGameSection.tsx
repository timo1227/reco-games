'use client'

import useGameContext from '@/hooks/useGameContext'

import { GameCard } from '../GameCard/GameCard'
import { GameCardSkeleton } from '../GameCard/GameCardSkeleton'
import { GameContainer, GameInnerContainer } from './GameContainers'

export default function UserGameSection() {
  const { games, loading } = useGameContext()

  if (loading) {
    return (
      <GameContainer>
        <GameInnerContainer>
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
        </GameInnerContainer>
      </GameContainer>
    )
  }

  return (
    <GameContainer>
      <GameInnerContainer>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </GameInnerContainer>
    </GameContainer>
  )
}
