import { SoundModel } from '../models/sound.model';
// import
import { getAudioForSounds } from './s3.service';

export async function getSounds(filter: string[] | null) {
  const options = filter ? { key: { $in: filter } } : {};
  const soundDocuments = await SoundModel.find({
    ...options,
  }).lean();

  return getAudioForSounds(soundDocuments);
}
