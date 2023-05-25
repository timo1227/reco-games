import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  games: [
    {
      id: Number,
      slug: String,
      name: String,
      background_image: String,
      parent_platforms: [
        {
          platform: {
            id: Number,
            slug: String,
            name: String,
          },
        },
      ],
    },
  ],
})

const Games = mongoose.models.Games || mongoose.model('Games', GameSchema)

export default Games
