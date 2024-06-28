interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex size-full flex-col items-center justify-center dark:bg-[#121212]'>
      {children}
    </div>
  )
}
