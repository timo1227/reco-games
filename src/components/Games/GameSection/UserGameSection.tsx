'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import useGameContext from '@/hooks/useGameContext'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function UserGameSection() {
  const { games } = useGameContext()

  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll px-5 scrollbar-hide dark:bg-black'>
      <div className='game-cards items-start justify-center gap-6 md:grid lg:grid-cols-2 xl:grid-cols-3'>
        {games.map((game) => (
          <Card
            key={game.id}
            className={cn('h-[450px]', 'overflow-hidden px-0', 'dark:bg-black')}
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
              <p>Platforms</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
