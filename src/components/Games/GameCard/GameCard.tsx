'use client'

import Image from 'next/image'

import { Games } from '@/types/Games'
import getCroppedImgUrl from '@/lib/image-url'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

import { GamePlatforms } from './GamePlatforms'

interface Props {
  game: Games
}

export const GameCard = ({ game }: Props) => {
  const { toast } = useToast()

  const onCardClick = () => {
    toast({
      title: 'TODO: Add Game Page',
      description: 'Game Page is not implemented yet',
      variant: 'destructive',
    })
  }
  return (
    <Card
      className={cn('h-[375px]', 'overflow-hidden px-0')}
      onClick={() => onCardClick()}
    >
      <CardHeader className={cn('mb-5 h-[65%] p-0')}>
        <Image
          src={getCroppedImgUrl(game.background_image)}
          alt={game.name}
          width={800}
          height={800}
          className='h-full w-full object-cover'
        />
      </CardHeader>
      <CardContent>
        {/* ADD PLATFORMS TO DB MODEL */}
        {game.parent_platforms && (
          <GamePlatforms
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
        )}
        <CardTitle className='text-xl font-bold'>{game.name}</CardTitle>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
