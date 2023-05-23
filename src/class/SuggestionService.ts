import axios from 'axios'

import { Games, SuggestionGames } from '@/types/Games'

class SuggestionService {
  getSuggestions(games: Games[]) {
    const controller = new AbortController()
    const req = axios.post<SuggestionGames>('/api/openAi', {
      games,
    })
    return { req, cancel: () => controller.abort() }
  }
}

const suggestionService = new SuggestionService()

export default suggestionService
