import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/app/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Reco Game',
  description: 'Get Game Recomendations ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body className={`h-full ${inter.className}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
