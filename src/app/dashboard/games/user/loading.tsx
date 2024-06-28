import { GameCardSkeleton } from '@/components/Games/GameCard/GameCardSkeleton'

export default function Loading() {
  return (
    <div className='dashboard-inner size-full overflow-y-scroll px-5 scrollbar-hide'>
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
