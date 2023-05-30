import { z } from 'zod'

import { Games } from '@/types/Games'

export const GameLibServiceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  background_image: z.string(),
  parent_platforms: z.array(
    z.object({
      platform: z.object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
      }),
    })
  ),
})

class GameLibService {
  getGames() {
    const controller = new AbortController()
    const req = fetch('/api/games', {
      signal: controller.signal,
    })
    return { req, cancel: () => controller.abort() }
  }

  addGame(games: Games[], game: Games) {
    const newGamesList = [...games, game]

    const controller = new AbortController()
    const req = fetch('/api/games', {
      method: 'PATCH',
      body: JSON.stringify({ games: newGamesList }),
      signal: controller.signal,
    })
    return { req, cancel: () => controller.abort() }
  }

  deleteGame(games: Games[], game: Games) {
    const newGamesList = games.filter((g) => g.slug !== game.slug)

    const controller = new AbortController()
    const req = fetch('/api/games', {
      method: 'PATCH',
      body: JSON.stringify({ games: newGamesList }),
      signal: controller.signal,
    })
    return { req, cancel: () => controller.abort() }
  }
}

const gameLibService = new GameLibService()

export default gameLibService
