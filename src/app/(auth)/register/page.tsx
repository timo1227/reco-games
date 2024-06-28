import * as React from 'react'
import { Metadata } from 'next'

import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register for an account',
}

export default function LoginPage() {
  return (
    <React.Suspense>
      <UserAuthForm toRegister />
    </React.Suspense>
  )
}
