import { GameCardSkeleton } from '@/components/Games/GameCard/GameCardSkeleton'

export default function Page() {
  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll px-5 scrollbar-hide'>
      <div className='game-cards items-start justify-center gap-6 md:grid lg:grid-cols-2 xl:grid-cols-4'>
        <GameCardSkeleton />
        <GameCardSkeleton />
        <GameCardSkeleton />
        <GameCardSkeleton />
        <GameCardSkeleton />
        <GameCardSkeleton />
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
