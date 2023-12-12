import mongoose, { Schema } from 'mongoose';

const UserWordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wordId: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  hasCompleted: { type: Boolean, default: false },
  groupName: { type: String, required: true },
});

UserWordSchema.index(
  { userId: 1, wordId: 1, groupName: 1 },
  {
    unique: true,
  },
);

export const UserWordModel = mongoose.model('UserWord', UserWordSchema);

// UserWordModel.ensureIndexes()
//   .then(() => {
//     console.log('UserWordModel.ensureIndexes()');
//   })
//   .catch((err) => {
//     console.log('UserWordModel.ensureIndexes() error', err);
//   });
