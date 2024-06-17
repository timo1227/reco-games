import { User } from 'next-auth'

// type UserId = string
type GameId = ObjectId

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      games: GameId
    }
  }
}
