import { GameCardSkeleton } from '@/components/Games/GameCard/GameCardSkeleton'
import {
  GameContainer,
  GameInnerContainer,
} from '@/components/Games/GameSection/GameContainers'

export default function Loading() {
  const skeletonCount = 12
  return (
    <GameContainer>
      <GameInnerContainer>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </GameInnerContainer>
    </GameContainer>
  )
}
