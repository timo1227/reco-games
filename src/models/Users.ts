import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, minlength: 5 },
  image: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;