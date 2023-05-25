import { GameCardSkeleton } from '@/components/Games/GameCard/GameCardSkeleton'
import {
  GameContainer,
  GameInnerContainer,
} from '@/components/Games/GameSection/GameContainers'

export default function Loading() {
  return (
    <GameContainer>
      <GameInnerContainer>
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
      </GameInnerContainer>
    </GameContainer>
  )
}
