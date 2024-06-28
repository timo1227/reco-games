'use client'

import SuggestionSection from '@/components/Games/GameSuggestion/SuggestionSection'

export default function Page({
  params: { gameID },
}: {
  params: { gameID: string }
}) {
  return (
    <div className='h-full w-full'>
      <SuggestionSection gameID={gameID} />
    </div>
  )
}
