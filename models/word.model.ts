import mongoose, { Schema, Document, Model } from 'mongoose';

const WordSchema = new Schema({
  word: { type: String, required: true },
  fullAudio: { type: String },
  sounds: [
    {
      letters: String,
      audioKey: String,
    },
  ],
});

export const WordModel = mongoose.model('Word', WordSchema);
