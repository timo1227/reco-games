'use client'

import Image from 'next/image'

import useGameContext from '@/hooks/useGameContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function UserGameSection() {
  const { games } = useGameContext()

  return (
    <div className='dashboard-inner h-full w-full overflow-y-scroll scrollbar-hide dark:bg-black'>
      <div className='game-cards flex flex-col items-center justify-center sm:flex-row sm:items-stretch md:flex-wrap md:justify-around'>
        {games.map((game) => (
          <Card key={game.id} className='bg-black'>
            <CardContent>
              <CardDescription>
                <p>{game.background_image}</p>
              </CardDescription>
            </CardContent>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
            </CardHeader>
            <CardFooter>
              <p>Platforms</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
