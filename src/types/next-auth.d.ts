import { ObjectId } from 'mongodb'
import { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

type UserId = ObjectId
type GameId = ObjectId

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    games: GameId
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      games: GameId
    }
  }
}
