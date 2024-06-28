import UserGamesSection from '@/components/Games/GameSection/UserGameSection'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard ',
}

export default async function Page() {
  return (
    <div className='size-full'>
      <UserGamesSection />
    </div>
  )
}
