export interface SuggestionGames {
  games: {
    description: string
    name: string
    reason: string
  }[]
}

export interface Platforms {
  id: number
  slug: string
  name: string
}

export interface Games {
  id: number
  slug: string
  name: string
  background_image: string
  parent_platforms: { platform: Platforms }[]
}
