'use client'

import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'

import SearchBar from '@/components/SearchBar/SearchBar'

interface GameCardHeaderProps {
  gameID: string
  steamGames: {
    appid: number
    name: string
  }[]
}

export default function Header({ gameID, steamGames }: GameCardHeaderProps) {
  const [toggleSearchBar, setToggleSearchBar] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setToggleSearchBar(false)
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const SearchIcon = () => {
    return (
      <BiSearchAlt2
        className='cursor-pointer text-xl text-black dark:text-white'
        onClick={() => setToggleSearchBar(!toggleSearchBar)}
      />
    )
  }

  return (
    <>
      <div className='flex w-full items-center'>
        <button
          className='mx-3 mt-2 w-full rounded border-2 border-black bg-gray-200/80 px-2 py-1 text-left text-black transition hover:cursor-text hover:bg-slate-200 dark:border-white dark:bg-black/60 dark:text-white dark:hover:bg-black/50'
          onClick={() => setToggleSearchBar(!toggleSearchBar)}
        >
          <BiSearchAlt2 className='mr-2 inline-block' />
          Search Game...
        </button>
      </div>
      <h3 className='mt-5 px-3'>Dashboard</h3>
      {toggleSearchBar && (
        <div className='z-55 fixed left-0 top-0 h-full w-full bg-[#fffffff1] dark:bg-[#181818f1]'>
          <SearchBar steamGames={steamGames} gameID={gameID} />
        </div>
      )}
    </>
  )
}
