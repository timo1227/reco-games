'use client'

import { useState } from 'react'
import Image from 'next/image'
import gameLibService from '@/class/GameLibService'
import { Minus, Plus } from 'lucide-react'

import { Games } from '@/types/Games'
import getCroppedImgUrl from '@/lib/image-url'
import { cn } from '@/lib/utils'
import useGameContext from '@/hooks/useGameContext'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'

import { GamePlatforms } from './GamePlatforms'

interface Props {
  game: Games
}

export const GameCard = ({ game }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const { games: userGames, setGames } = useGameContext()
  const { toast } = useToast()

  const isInLibrary = userGames.find((g) => g.id === game.id)

  const onCardClick = () => {
    toast({
      title: 'TODO: Add Game Page',
      description: 'Game Page is not implemented yet',
      variant: 'destructive',
    })
  }

  const onAddToLibrary = () => {
    gameLibService.addGame(userGames, game)
    setGames((prev) => [...prev, game])
  }

  const onRemoveFromLibrary = () => {
    gameLibService.deleteGame(userGames, game)
    setGames((prev) => prev.filter((g) => g.id !== game.id))
  }

  const onAddRemoveFromLibrary = () => {
    if (isInLibrary) {
      onRemoveFromLibrary()
      toast({
        title: 'Removed from library',
        description: `${game.name} has been removed from your library`,
      })
    } else {
      onAddToLibrary()
      toast({
        title: 'Added to library',
        description: `${game.name} has been added to your library`,
      })
    }
  }

  return (
    <Card
      className={cn(
        'h-[375px] w-[250px] md:w-[300px]',
        ' relative overflow-hidden px-0'
      )}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className={cn('mb-5 h-[65%] p-0')}>
        <Image
          src={getCroppedImgUrl(game.background_image)}
          alt={game.name}
          width={600}
          height={400}
          className='h-full w-full object-cover'
        />
      </CardHeader>
      <CardContent className='absolute'>
        {game.parent_platforms && (
          <GamePlatforms
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
        )}
        <CardTitle
          className='text-xl font-bold hover:cursor-pointer hover:underline'
          onClick={() => onCardClick()}
        >
          {game.name}
        </CardTitle>
      </CardContent>
      <CardFooter
        className={cn(
          !isHovered ? 'hidden' : 'block animate-in',
          'absolute bottom-1 right-1 max-w-fit p-0'
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                className=' w-10 rounded-full p-0 dark:border-gray-700'
                onClick={() => onAddRemoveFromLibrary()}
              >
                {isInLibrary ? (
                  <>
                    <Minus className='h-4 w-4' />
                    <span className='sr-only'>Minus</span>
                  </>
                ) : (
                  <>
                    <Plus className='h-4 w-4' />
                    <span className='sr-only'>Add</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isInLibrary ? 'Remove from library' : 'Add to library'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
