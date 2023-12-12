import mongoose, { Schema, Document, Model } from 'mongoose';

const SoundSchema = new Schema({
  key: { type: String, required: true },
  sound: { type: String, required: true },
  category: { type: String },
  examples: [
    {
      type: String,
    },
  ],
  alternateSpellings: [
    {
      type: String,
    },
  ],
  alternateExamples: [
    {
      type: String,
    },
  ],
});

export const SoundModel = mongoose.model('Sound', SoundSchema);
