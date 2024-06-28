import GamesProvider from '@/providers/GamesProvider'

import SideBar from '@/components/Bars/SideBar/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <GamesProvider>
      <main className='mx-auto flex h-full max-w-7xl flex-row pb-4 pt-24'>
        <SideBar />
        {children}
      </main>
    </GamesProvider>
  )
}
