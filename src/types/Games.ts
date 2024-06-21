export interface SuggestionGames {
  games: {
    description: string
    name: string
    reason: string
  }[]
}

type PlatfromSlug =
  | 'pc'
  | 'playstation'
  | 'xbox'
  | 'ios'
  | 'android'
  | 'linux'
  | 'nintendo'
  | 'mac'
  | 'web'
export interface Platforms {
  id: number
  slug: PlatfromSlug
  name: string
}

export interface ParentPlatforms {
  platform: Platforms
}

export interface Games {
  id: string
  slug: string
  name: string
  background_image: string
  parent_platforms: ParentPlatforms[]
}
