import Image from 'next/image'

import { Games } from '@/types/Games'

interface Props {
  game: Games
}

export default function GameCard({ game }: Props) {
  return (
    <>
      <div className=' flex max-w-md flex-col items-center justify-center rounded-lg border border-gray-400 p-5  '>
        <h3 className='font-bold'>{game.name}</h3>
        <p>Sorry, no details available for this game.</p>
      </div>
      {/* <div
        key={game.appid}
        className='m-5 max-w-xs overflow-hidden rounded-xl border-4 border-black/10 shadow-lg'
      >
        {headerImage && (
          <Image
            className=''
            height={1600}
            width={500}
            src={headerImage}
            alt='header image'
          />
        )}
        <h3 className='flex h-20 w-full items-center justify-center text-center font-bold'>
          {game.name}
        </h3>
        {details && (
          <div
            className='flex items-center justify-center overflow-y-auto border-t-2 border-gray-400 p-5 text-sm leading-relaxed text-gray-500'
            dangerouslySetInnerHTML={{ __html: details }}
          />
        )}
      </div> */}
    </>
  )
}
