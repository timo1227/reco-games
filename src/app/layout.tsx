import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/providers/Provider'

import { cn } from '@/lib/utils'
import Nav from '@/components/Bars/navbar'

const fontInter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Reco Game',
  description: 'Get Game Recommendations ',
  keywords: 'game, recommendations, ',
  authors: [
    {
      name: 'Tim',
    },
  ],
  creator: 'Tim',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full' suppressHydrationWarning>
      <body className={cn(`h-full dark:bg-black dark:text-white`, fontInter)}>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  )
}
