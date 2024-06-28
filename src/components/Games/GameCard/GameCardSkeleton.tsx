import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const GameCardSkeleton = () => {
  return (
    <Card
      className={cn('h-[375px] w-[250px] md:w-[300px]', 'overflow-hidden px-0')}
    >
      <CardHeader className={cn('mb-5 h-[65%] p-0')}>
        <Skeleton className='size-full rounded-none' />
      </CardHeader>
      <CardContent>
        <CardTitle>
          <Skeleton className='h-5 w-3/4' />
        </CardTitle>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Skeleton className='size-5' />
        <Skeleton className='size-5' />
        <Skeleton className='size-5' />
        <Skeleton className='size-5' />
        <Skeleton className='size-5' />
      </CardFooter>
    </Card>
  )
}
