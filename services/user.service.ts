import { UserModel } from '../models/user.model';

export async function getUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export async function getUserById(userId: string) {
  return UserModel.findOne({ _id: userId });
}

interface UserUpdateParams {
  userId: string;
  wordGroup: string;
}

export async function updateUser({ userId, wordGroup }: Partial<UserUpdateParams>) {
  return UserModel.updateOne(
    { _id: userId },
    {
      $push: {
        wordGroups: {
          $each: [wordGroup],
          $position: 0,
        },
      },
    },
  );
}
