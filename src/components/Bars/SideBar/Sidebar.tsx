import { Games } from '@/types/Games'

import Header from '../components/Header'
import SideBarLink from '../components/Link'

interface Props {
  gameID: string
}

export default function SideBar({ gameID }: Props) {
  const GamesList: Games[] = [] // TODO: Fetch games from API

  return (
    <aside className='sticky left-0 hidden h-full w-[25rem] bg-white dark:bg-black lg:block'>
      {/* @ts-expect-error server component */}
      <Header GamesList={GamesList} />

      <div className='mt-5'>
        <SideBarLink href='/Dashboard/Games/All/1' name='View Games' />
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
