'use client';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { IoPersonSharp } from 'react-icons/io5';

const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Town', href: '/Town' },
  { name: 'Features', href: '#Features' },
  { name: 'About', href: '#About' },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session } = useSession();

  function SessionLink() {
    if (session) {
      if (mobileMenuOpen) {
        return (
          <Link
            href='/Login'
            className='text-sm font-semibold leading-6 text-gray-900'
            onClick={() => signOut()}>
            Log out
          </Link>
        );
      }
      return (
        <div className='relative inline-block text-left'>
          <div>
            <button
              type='button'
              className='flex items-center text-sm font-medium text-black hover:text-gray-700 hover:underline focus:outline-none'
              id='options-menu'
              aria-expanded='true'
              aria-haspopup='true'
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <span className='sr-only'>Open user menu</span>
              <IoPersonSharp className='h-6 w-6' aria-hidden='true' />
            </button>
            {/* // Profile dropdown panel, show/hide based on dropdown state. */}
            <div
              className={`${
                profileMenuOpen ? 'block' : 'hidden'
              } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'>
              <Link
                href='/Profile'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'>
                Your Profile
              </Link>
              <Link
                href='/Login'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'
                onClick={() => signOut()}>
                Log out
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      if (mobileMenuOpen) {
        return (
          <Link
            href='/Login'
            className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
            onClick={() => signIn()}>
            Log in
          </Link>
        );
      }
      return (
        <Link
          href='/'
          className='text-sm font-semibold leading-6 text-gray-900'
          onClick={() => signIn()}>
          Log in <span aria-hidden='true'>&rarr;</span>
        </Link>
      );
    }
  }

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <Image
              className='h-8 w-auto'
              width={30}
              height={50}
              src='/logo.jpg'
              alt='Covey Town Logo'
            />
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {NAVIGATION.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900'>
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <SessionLink />
        </div>
      </nav>
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Covey Town</span>
              <Image
                className='h-8 w-auto'
                src='/logo.jpg'
                width={30}
                height={50}
                alt='Covey Town Logo'
              />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}>
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-50/10'>
              <div className='space-y-2 py-6'>
                {NAVIGATION.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='py-6'>
                <SessionLink />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}