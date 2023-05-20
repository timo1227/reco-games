'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

interface Props {
  children: React.ReactNode
}

export default function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
