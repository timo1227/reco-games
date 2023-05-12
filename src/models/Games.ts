import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  games: [
    {
      appid: Number,
      name: String,
      // categories: [
      //   {
      //     id: { type: Number, required: true, unique: true },
      //     description: String,
      //   },
      // ],
    },
  ],
});

const Games = mongoose.models.Games || mongoose.model("Games", GameSchema);

export default Games;
