import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface LinkProps {
  href: string
  name: string
}

export default function SideBarLink({ href, name }: LinkProps) {
  return (
    <Link
      href={href}
      className='flex w-full items-center justify-between px-4 py-2 text-left dark:text-gray-500 dark:hover:text-white '
    >
      {name}
      <ChevronRightIcon className='h-5 w-5' />
    </Link>
  )
}
