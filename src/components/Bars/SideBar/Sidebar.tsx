import { Games } from '@/types/Games'

import Header from '../components/Header'
import SideBarLink from '../components/Link'

interface SideBarProps {
  gameID: string
  GamesList: Games[]
}

export default function SideBar({ gameID, GamesList }: SideBarProps) {
  return (
    <aside className='sticky left-0 hidden h-full w-[25rem] bg-white dark:bg-black lg:block'>
      {/* @ts-expect-error server component */}
      <Header gameID={gameID} GamesList={GamesList} />

      <div className='mt-5'>
        <SideBarLink href='/Dashboard/Games/All' name='View Games' />
        <SideBarLink href={`/Dashboard/Games/${gameID}`} name='My Games' />
        <SideBarLink
          href={`/Dashboard/Suggestions/${gameID}`}
          name='Suggestions'
        />
        <SideBarLink href='/' name='Profile' />
      </div>
    </aside>
  )
}
