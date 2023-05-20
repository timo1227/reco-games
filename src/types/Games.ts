export interface GamesType {
  appid: Number
  name: String
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
