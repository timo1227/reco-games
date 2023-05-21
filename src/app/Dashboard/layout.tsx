import { notFound } from 'next/navigation'
import GamesProvider from '@/providers/GamesProvider'

import { Games } from '@/types/Games'
import rawg from '@/lib/rawg'
import { getCurrentUser } from '@/lib/session'
import SideBar from '@/components/Bars/SideBar/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard for the app ',
}

interface FetchGamesRes {
  next: string
  count: number
  results: Games[]
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getCurrentUser()
  if (!user) return notFound()

  const RawgList = await rawg
    .get<FetchGamesRes>('/games')
    .then((res) => res.data.results)
    .catch((error) => {
      console.log(error)
      return []
    })

  return (
    <GamesProvider gamesID={user.games}>
      <div className='mx-auto flex h-full max-w-7xl flex-row pt-24'>
        <SideBar gameID={user.games} GamesList={RawgList} />
        {children}
      </div>
    </GamesProvider>
  )
}
