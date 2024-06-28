'use client'

import Link from 'next/link'

import useGameContext from '@/hooks/useGameContext'

import { GameCard } from '../GameCard/GameCard'
import { GameCardSkeleton } from '../GameCard/GameCardSkeleton'
import { GameContainer, GameInnerContainer } from './GameContainers'

export default function UserGameSection() {
  const { gameList, loading } = useGameContext()

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
        {gameList.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        {gameList.length === 0 && (
          <div className='text-center text-gray-500'>
            You don&apos;t have any games in your library yet. {` `} <br />
            <span className='text-gray-400'>
              Add some games to your library!
              <Link href='./1'> Here</Link>
            </span>
          </div>
        )}
      </GameInnerContainer>
    </GameContainer>
  )
}
