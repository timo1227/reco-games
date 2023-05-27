import { BiSearchAlt2 } from 'react-icons/bi'

import { Games } from '@/types/Games'
import { getCurrentUser } from '@/lib/session'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import SearchBar from '@/components/Bars/components/SearchBar/SearchBar'

interface GameCardHeaderProps {
  gameID: string
  GamesList: Games[]
}

export default async function Header({
  gameID,
  GamesList,
}: GameCardHeaderProps) {
  const user = await getCurrentUser()

  return (
    <>
      <div className='flex w-full items-center'>
        <Dialog>
          <DialogTrigger className='mx-3 mt-2 w-full rounded border border-black px-2 py-1 text-left text-black transition hover:cursor-text hover:bg-slate-200/25 dark:border-white dark:bg-black/60 dark:text-white dark:hover:bg-black/50'>
            <BiSearchAlt2 className='mr-2 inline-block font-thin' />
            Search Game...
          </DialogTrigger>
          <DialogContent
            customClose={true}
            className='bg-gray-0 max-w-2xl overflow-y-auto rounded-t-lg px-0 pb-2 pt-1  md:border-gray-300 md:dark:border-gray-500'
          >
            <SearchBar GamesList={GamesList} gameID={gameID} />
          </DialogContent>
        </Dialog>
      </div>
      <h3 className='mt-5 px-3 text-xl font-bold'>
        {user?.name}&apos;s Dashboard
      </h3>
    </>
  )
}
