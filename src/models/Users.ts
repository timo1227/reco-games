import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, minlength: 5 },
  games: { type: mongoose.Schema.Types.ObjectId, ref: "Games" },
  image: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
