import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export const GameInnerContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'grid items-start justify-center gap-6 md:grid-cols-2 xl:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const GameContainer = ({ children, className }: Props) => {
  return (
    <main
      className={cn(
        'h-full w-full overflow-y-scroll px-5 scrollbar-hide',
        className
      )}
    >
      {children}
    </main>
  )
}
