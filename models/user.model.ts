import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wordGroups: [
    {
      type: String,
    },
  ],
});

export const UserModel = mongoose.model('User', UserSchema);
