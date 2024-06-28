import * as React from 'react'
import { Metadata } from 'next'

import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <React.Suspense>
      <UserAuthForm />
    </React.Suspense>
  )
}
