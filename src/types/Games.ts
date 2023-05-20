export interface GamesType {
  appid: number
  name: string
  // categories: {
  //   id: number;
  //   description: string;
  // }[];
}

export interface SuggestionGames {
  games: {
    description: string
    name: string
    reason: string
  }[]
}
