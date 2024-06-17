import { ObjectId } from 'mongodb'

import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params: { gameID } }: { params: { gameID: ObjectId } }
) {
  try {
    await db()

    const { games } = await req.json()

    const UserGamesDoc = await Games.findByIdAndUpdate(
      gameID,
      { games },
      { new: true }
    )

    if (!UserGamesDoc) {
      return new Response(JSON.stringify({ errorMSG: 'Game not found' }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify(UserGamesDoc), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ errorMSG: err.message }), {
      status: 500,
    })
  }
}

export async function GET(
  req: Request,
  { params: { gameID } }: { params: { gameID: ObjectId } }
) {
  try {
    await db()
    const games = await Games.findById(gameID)

    if (!games) {
      return new Response(JSON.stringify({ errorMSG: 'Game not found' }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify(games), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ errorMSG: err.message }), {
      status: 500,
    })
  }
}
