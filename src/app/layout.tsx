import './globals.css'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import Nav from '@/components/Bars/navbar'
import Provider from '@/app/Provider'

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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'white' },
    { media: '(prefers-color-scheme: light)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full' suppressHydrationWarning>
      <body className={cn(`h-full dark:bg-black`, fontInter)}>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  )
}
