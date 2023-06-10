import { GameCardSkeleton } from '@/components/Games/GameCard/GameCardSkeleton'

export default function Loading() {
  return (
    <div className='dashboard-inner scrollbar-hide h-full w-full overflow-y-scroll px-5'>
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
