'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import { Games } from '@/types/Games'
import useGameContext from '@/hooks/useGameContext'
import { useToast } from '@/components/ui/use-toast'

interface SearchBarProps {
  GamesList: Games[]
  gameID: string
}

export default function SearchBar({ GamesList, gameID }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGames, setSelectedGames] = useState<Games[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const { games } = useGameContext()
  const { toast } = useToast()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    // Initial check for mobile
    setIsMobile(window.innerWidth < 768)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const filteredGames =
    searchTerm.length >= 3
      ? GamesList.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : []

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmitButton = async () => {
    toast({
      title: 'All Game Pages with query: ' + searchTerm,
      description: 'Coming Soon!',
      variant: 'destructive',
    })
  }

  useEffect(() => {
    console.log('Selected Games: ', selectedGames)
  }, [selectedGames])

  if (isMobile) {
    return (
      <div
        role='dialog'
        id='radix-:r5:'
        aria-describedby='radix-:r7:'
        aria-labelledby='radix-:r6:'
        data-state='open'
        aria-label='Search Command Menu'
        cmdk-dialog=''
        tabIndex={-1}
        className='overflow-x-hidden'
      >
        <div cmdk-root=''>
          {/* Create Submit Button and Exit Button */}
          <div className='flex items-center justify-between border-b border-gray-300 px-4 py-2 dark:border-gray-600'>
            {/* <button
              aria-label="Submit"
              className="absolute right-4 top-[26px] border border-gray-200 transition text-xs text-gray-400 px-1 rounded-[4px] h-[20px] font-medium hover:text-gray-500 hover:bg-green-400 md:block"
              tabIndex={-1}
              type="button"
              onClick={handleSubmitButton}
            >
              Submit
            </button> */}
          </div>
          <label htmlFor=':rag:' cmdk-label='' id=':raf:' className='hidden'>
            Search Command Menu
          </label>
          <input
            className='md:border-t-none w-full rounded-t-lg border-b border-gray-300 bg-transparent px-4 py-4 outline-none dark:border-t dark:border-gray-600 dark:bg-black/20'
            placeholder='Search Games'
            cmdk-input=''
            autoComplete='off'
            autoCorrect='off'
            spellCheck='false'
            aria-autocomplete='list'
            role='combobox'
            aria-expanded='true'
            aria-controls=':rae:'
            aria-labelledby=':raf:'
            id=':rag:'
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            aria-label='Submit'
            className='absolute right-4 top-[40px] h-[20px] rounded-[4px] border border-gray-200 px-1 text-xs font-medium text-gray-400 transition hover:bg-green-400 hover:text-gray-500 md:block'
            tabIndex={-1}
            type='button'
            onClick={handleSubmitButton}
          >
            Submit
          </button>
          <div
            className='relative max-h-96 px-2'
            data-dirty-and-empty='false'
            data-fix-height='false'
            cmdk-list=''
            role='listbox'
            aria-label='Suggestions'
            id=':rb6:'
            aria-labelledby=':rb8:'
          >
            {filteredGames.length > 0
              ? filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className={
                      selectedGames.includes(game) ||
                      games.some((g) => g.id === game.id)
                        ? 'hidden'
                        : 'cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-black/10'
                    }
                    role='option'
                    id=':rah:'
                    aria-selected='false'
                  >
                    <div
                      className='flex items-center justify-between overflow-x-hidden'
                      onClick={() => {
                        setSelectedGames([...selectedGames, game])
                      }}
                    >
                      <div className='flex items-center'>
                        <div className='flex flex-col'>
                          <div className='text-sm font-medium text-gray-900 dark:text-white'>
                            <span className='truncate'>{game.name}</span>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                              {game.id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : searchTerm.length >= 3 && (
                  <div className='text-center text-gray-500 dark:text-gray-400'>
                    No games found.
                  </div>
                )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      role='dialog'
      id='radix-:r5:'
      aria-describedby='radix-:r7:'
      aria-labelledby='radix-:r6:'
      data-state='open'
      aria-label='Search Command Menu'
      cmdk-dialog=''
      tabIndex={-1}
      className='overflow-x-hidden'
    >
      <div cmdk-root=''>
        <label htmlFor=':rag:' cmdk-label='' id=':raf:' className='hidden'>
          Search Command Menu
        </label>
        <input
          className='md:border-t-none w-full rounded-t-lg border-b border-gray-300 bg-transparent px-4 py-4 outline-none dark:border-t dark:border-gray-600 dark:bg-black/20'
          placeholder='Search Games'
          cmdk-input=''
          autoComplete='off'
          autoCorrect='off'
          spellCheck='false'
          aria-autocomplete='list'
          role='combobox'
          aria-expanded='true'
          aria-controls=':rae:'
          aria-labelledby=':raf:'
          id=':rag:'
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          aria-label='Submit'
          className='absolute right-4 top-[26px] hidden h-[20px] rounded-[4px] border border-gray-200 px-1 text-xs font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white md:block'
          tabIndex={-1}
          type='button'
          onClick={handleSubmitButton}
        >
          Search
        </button>
        <div
          className='relative max-h-96 px-2'
          data-dirty-and-empty='false'
          data-fix-height='false'
          cmdk-list=''
          role='listbox'
          aria-label='Suggestions'
          id=':rb6:'
          aria-labelledby=':rb8:'
        >
          {filteredGames.length > 0
            ? filteredGames.map((game) => (
                <div
                  key={game.id}
                  className={
                    selectedGames.includes(game) ||
                    games.some((g) => g.id === game.id)
                      ? 'hidden'
                      : 'cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-black/10'
                  }
                  role='option'
                  id=':rah:'
                  aria-selected='false'
                >
                  <div
                    className='flex items-center justify-between overflow-x-hidden'
                    onClick={() =>
                      toast({
                        title: 'Game Page',
                        description: 'Soon: Redirecting to game page...',
                        variant: 'destructive',
                      })
                    }
                  >
                    <div className='flex items-center'>
                      <div className='flex flex-col'>
                        <div className='text-sm font-medium text-gray-900 dark:text-white'>
                          <span className='truncate'>{game.name}</span>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {game.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : searchTerm.length >= 3 && (
                <div className='p-4 text-center text-gray-500 dark:text-gray-400'>
                  No games found.
                </div>
              )}
        </div>
      </div>
    </div>
  )
}
