import Image from 'next/image'

import { Games } from '@/types/Games'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { GamePlatforms } from './GamePlatforms'

interface Props {
  game: Games
  cardClickAction: () => void
}

export const GameCard = ({ game, cardClickAction }: Props) => {
  return (
    <Card
      className={cn('h-[375px]', 'overflow-hidden px-0')}
      onClick={() => cardClickAction()}
    >
      <CardHeader className={cn('mb-5 h-[65%] p-0')}>
        <Image
          src={game.background_image}
          alt={game.name}
          width={800}
          height={800}
          className='h-full w-full object-cover'
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{game.name}</CardTitle>
      </CardContent>
      <CardFooter>
        <GamePlatforms />
      </CardFooter>
    </Card>
  )
}
