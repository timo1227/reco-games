'use server'

import { Games } from '@/types/Games'
import { db } from '@/lib/db'
import getSession from '@/lib/session'

export const getGames = async () => {
  const session = await getSession()

  if (!session) {
    return []
  }

  const games = await db.game.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      background_image: true,
      parent_platforms: {
        select: {
          platform: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
        },
      },
    },
  })

  return games || ([] satisfies Games[])
}

export const addGame = async (game: Games) => {
  const session = await getSession()

  if (!session) {
    return
  }

  // Add user's game to the database
  await db.game.create({
    data: {
      userId: session.user.id,
      slug: game.slug,
      name: game.name,
      background_image: game.background_image,
      parent_platforms: {
        create: game.parent_platforms.map((p) => ({
          platform: {
            connect: {
              id: p.platform.id,
            },
          },
        })),
      },
    },
  })
}
