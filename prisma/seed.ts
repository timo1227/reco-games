/* eslint-disable no-console */
/**
 * Seed the database with platforms
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const platforms = [
  { id: 1, slug: 'pc', name: 'PC' },
  { id: 2, slug: 'playstation', name: 'PlayStation' },
  { id: 3, slug: 'xbox', name: 'Xbox' },
  { id: 4, slug: 'ios', name: 'iOS' },
  { id: 5, slug: 'android', name: 'Android' },
  { id: 6, slug: 'linux', name: 'Linux' },
  { id: 7, slug: 'nintendo', name: 'Nintendo' },
  { id: 8, slug: 'mac', name: 'Mac' },
  { id: 9, slug: 'web', name: 'Web' },
]

async function seedPlatforms() {
  console.log('Seeding platforms ...')

  for (const platform of platforms) {
    const platformExists = await prisma.platform.findUnique({
      where: {
        id: platform.id,
      },
    })

    if (!platformExists) {
      await prisma.platform.create({
        data: platform,
      })
    }
  }

  console.log('Platforms seeding completed.')
}

async function main() {
  console.log('Start seeding ...')

  await seedPlatforms()

  console.log('Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
