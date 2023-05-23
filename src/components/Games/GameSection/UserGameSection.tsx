'use client'

import useGameContext from '@/hooks/useGameContext'
import { useToast } from '@/components/ui/use-toast'

import { GameCard } from '../GameCard/GameCard'
import { GameCardSkeleton } from '../GameCard/GameCardSkeleton'

export default function UserGameSection() {
  const { games, loading } = useGameContext()
  const { toast } = useToast()

  const onCardClick = () => {
    toast({
      title: 'TODO: Add Game Page',
      description: 'Game Page is not implemented yet',
      variant: 'destructive',
    })
  }

  if (loading) {
    return (
      <div className='dashboard-inner h-full w-full overflow-y-scroll px-5 scrollbar-hide'>
        <div className='game-cards items-start justify-center gap-6 md:grid lg:grid-cols-2 xl:grid-cols-3'>
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll px-5 scrollbar-hide'>
      <div className='game-cards items-start justify-center gap-6 md:grid lg:grid-cols-2 xl:grid-cols-3'>
        {games.map((game) => (
          <GameCard key={game.id} game={game} cardClickAction={onCardClick} />
        ))}
      </div>
    </div>
  )
}
