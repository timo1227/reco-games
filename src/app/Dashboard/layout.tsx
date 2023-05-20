import { notFound } from 'next/navigation'
import GamesProvider from '@/providers/GamesProvider'

import { getCurrentUser } from '@/lib/session'
import SideBar from '@/components/Bars/SideBar/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}
export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard for the app ',
}

async function getSteamGames() {
  const res = await fetch(
    'https://api.steampowered.com/ISteamApps/GetAppList/v2/',
    {
      cache: 'no-store',
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data.applist.apps
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getCurrentUser()
  if (!user) return notFound()

  const steamGames = await getSteamGames()

  return (
    <GamesProvider gamesID={user.games}>
      <div className='mx-auto flex h-full max-w-7xl flex-row pt-24'>
        <SideBar gameID={user.games} steamGames={steamGames} />
        {children}
      </div>
    </GamesProvider>
  )
}
