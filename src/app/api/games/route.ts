import Games from '@/models/Games'

import db from '@/lib/dbConnect'
import { getCurrentUser } from '@/lib/session'

export async function PATCH(req: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const userGamesId = user.games

  try {
    await db()
    const { games } = await req.json()
    const UserGamesDoc = await Games.findByIdAndUpdate(
      userGamesId,
      { games },
      { new: true }
    )
    return new Response(JSON.stringify(UserGamesDoc), { status: 200 })
  } catch (err: any) {
    return new Response('Error', { status: 500 })
  }
}
