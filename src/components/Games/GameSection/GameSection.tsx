'use client'

import useGameContext from '@/hooks/useGameContext'

import GameCard from '../GameCard/GameCard'

export default function GameSection() {
  const { games } = useGameContext()

  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll scrollbar-hide dark:bg-black'>
      <div className='game-cards flex flex-col items-center justify-center sm:flex-row sm:items-stretch md:flex-wrap md:justify-around'>
        {games.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </div>
  )
}
