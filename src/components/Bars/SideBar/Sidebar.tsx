import { Games } from '@/types/Games'

import Header from '../components/Header'
import SideBarLink from '../components/Link'

const SideBar = async () => {
  const GamesList: Games[] = [] // TODO: Fetch games from API

  return (
    <aside className='sticky left-0 hidden h-full w-[25rem] bg-white dark:bg-black lg:block'>
      <Header GamesList={GamesList} />

      <div className='mt-5'>
        <SideBarLink href='/dashboard/games/1' name='View Games' />
        <SideBarLink href={`/dashboard/games/user`} name='My Games' />
        <SideBarLink href={`/dashboard/suggestions`} name='Suggestions' />
        <SideBarLink href='/' name='Profile' />
      </div>
    </aside>
  )
}

export default SideBar
