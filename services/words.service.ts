import { WordModel } from '../models/word.model';
import { UserWordModel } from '../models/user-words.model';

interface GetWordsParams {
  userId: string;
  groupName?: string;
}
export async function getWordsByGroupName({ userId, groupName }: GetWordsParams) {
  // const userWithWords = await UserModel.findById(userId).populate('words');
  // return userWithWords;
  const findOpts: GetWordsParams = { userId };
  if (groupName) findOpts.groupName = groupName;
  const words = await UserWordModel.find(findOpts).populate('wordId').lean();
  return words;
}

export async function getWordsByGroupNameSimple({ userId, groupName }: GetWordsParams) {
  const findOpts: GetWordsParams = { userId };
  if (groupName) findOpts.groupName = groupName;
  return UserWordModel.find(findOpts).lean();
}

export interface CreateWordParams {
  word: string;
  fullAudio: string;
  sounds: {
    letters: string;
    audio: string;
  }[];
}
export async function createWord(params: CreateWordParams) {
  const word = new WordModel({
    word: params.word,
    fullAudio: params.fullAudio,
    sounds: params.sounds,
  });

  await word.save();
  return word;
}

export async function getAllWords() {
  return WordModel.find();
}
