import { UserWordModel } from '../models/user-words.model';
import exp from 'constants';

interface AssociateWordsToUserParams {
  userId: string;
  wordIds: string[];
  groupName: string;
}

export async function associateWordsToUser({
  userId,
  wordIds,
  groupName,
}: AssociateWordsToUserParams) {
  const userWords = wordIds.map((wordId) => ({
    userId,
    wordId,
    groupName,
  }));

  return UserWordModel.insertMany(userWords);
}

interface CreateWordGroupParams {
  groupName: string;
  userId: string;
}

export async function createWordGroup({ groupName, userId }: CreateWordGroupParams) {
  const userWord = new UserWordModel({
    userId,
    groupName,
  });
  return userWord.save();
}

interface DeleteWordsFromGroupParams {
  wordsToDelete: string[];
  userId: string;
}

export async function deleteWordsFromGroup({
  userId,
  wordsToDelete,
}: DeleteWordsFromGroupParams) {
  return UserWordModel.deleteMany({
    userId,
    _id: {
      $in: wordsToDelete,
    },
  });
}
