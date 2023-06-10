export default function Loading() {
  // Loading Spinner Annimation
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='h-32 w-32 animate-spin rounded-full border-b-4 border-t-2 border-black dark:border-white'></div>
    </div>
  )
}
