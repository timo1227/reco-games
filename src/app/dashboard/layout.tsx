import GamesProvider from '@/providers/GamesProvider'

import getSession from '@/lib/session'
import SideBar from '@/components/Bars/SideBar/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <GamesProvider>
      <main className='mx-auto flex h-full max-w-7xl flex-row pt-24 pb-4'>
        <SideBar />
        {children}
      </main>
    </GamesProvider>
  )
}
