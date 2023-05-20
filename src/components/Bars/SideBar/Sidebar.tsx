import Header from './components/Header'
import SideBarLink from './components/Link'

interface SideBarProps {
  gameID: string
  steamGames: {
    appid: number
    name: string
  }[]
}

export default async function SideBar({ gameID, steamGames }: SideBarProps) {
  return (
    <div className='sticky left-0 h-full w-[25rem] bg-white dark:bg-black'>
      <Header gameID={gameID} steamGames={steamGames} />

      <div className='mt-10'>
        <SideBarLink href='/' name='Profile' />
        <SideBarLink href={`/Dashboard/Games/${gameID}`} name='View Games' />
        <SideBarLink
          href={`/Dashboard/Suggestions/${gameID}`}
          name='Suggestions'
        />
      </div>
    </div>
  )
}
