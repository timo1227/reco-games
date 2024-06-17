import { Metadata } from 'next'

import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center dark:bg-[#121212]'>
      <UserAuthForm />
    </div>
  )
}
