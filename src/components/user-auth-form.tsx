'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

import { Icons } from './icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  toRegister?: boolean
}

type UserAuthFormValues = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, toRegister }: UserAuthFormProps) {
  const form = useForm<UserAuthFormValues>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: UserAuthFormValues) {
    setIsLoading(true)

    const signInResult = await signIn('resend', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard/games/1',
    })

    setIsLoading(false)

    if (signInResult?.error) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    })
  }

  return (
    <>
      <div className='flex h-[calc(100vh-11rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          {!toRegister ? (
            <div>
              <Link href='/'>
                <Image
                  className='mx-auto h-44 w-auto'
                  width={300}
                  height={500}
                  src='/logo.jpg'
                  alt='Logo'
                />
              </Link>
              <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Sign in to your account
              </h2>
              <p className='mt-2 text-center text-sm text-gray-600 dark:text-white'>
                Or{' '}
                <Link
                  className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
                  href='/register'
                >
                  Create your Account today
                </Link>
              </p>
            </div>
          ) : (
            <div>
              <Image
                className='mx-auto h-44 w-auto'
                width={300}
                height={500}
                src='/logo.jpg'
                alt='Logo'
              />
              <h2 className='mt-6 px-5 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Create your account
              </h2>
              <p className='mt-2 text-center text-sm text-gray-600'>
                Or{' '}
                <Link
                  className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
                  href='/login'
                >
                  Sign into your Account
                </Link>
              </p>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn('space-y-5', className)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='example@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading || isGoogleLoading}
                type='submit'
                className='group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='size-5 text-blue-500 group-hover:text-blue-400'
                    aria-hidden='true'
                  />
                </span>
                {isLoading ? (
                  <svg
                    className='-ml-1 mr-3 size-5 animate-spin text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                ) : (
                  `${toRegister ? 'Create Account' : 'Sign In'}`
                )}
              </Button>
              {toRegister && (
                <p>
                  By clicking the button above, you agree to our{' '}
                  <Link
                    href='/terms'
                    className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
                  >
                    Privacy Policy
                  </Link>
                </p>
              )}
            </form>
          </Form>
          <div className='flex flex-col items-center gap-5'>
            <div className='relative'>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant={'outline'}
              onClick={() => {
                setIsGoogleLoading(true)
                signIn('google')
              }}
              className={cn(
                'max-w-96 rounded-sm border border-[#747775] bg-[#131314] text-white',
                'hover:border-[#747775] hover:bg-[#131314]/55',
                'disabled:bg-[#13131461]'
              )}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Icons.spinner className='mr-2 size-4 animate-spin' />
              ) : (
                <Icons.google className='mr-2 size-5' />
              )}
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
