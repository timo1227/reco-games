import { notFound } from 'next/navigation'
import GamesProvider from '@/providers/GamesProvider'

import { getCurrentUser } from '@/lib/session'
import SideBar from '@/components/Bars/SideBar/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getCurrentUser()
  if (!user) return notFound()

  return (
    <GamesProvider gamesID={user.games}>
      <main className='mx-auto flex h-full max-w-7xl flex-row pt-24'>
        <SideBar gameID={user.games} />
        {children}
      </main>
    </GamesProvider>
  )
}
