import express, { Request, Response } from 'express';

const router = express.Router();
import * as userWordsService from '../services/user-words.service';
import * as userService from '../services/user.service';
import * as wordsService from '../services/words.service';
import { getWordsByGroupNameSimple } from '../services/words.service';

router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const { groupName } = body;
  if (!req.user?.id || !groupName) {
    return res.status(401).json({
      error: 'Must provide groupName and userId',
    });
  }
  const user = await userService.getUserById(req.user?.id);
  if (user && !user.wordGroups.includes(groupName)) {
    const wordResponse = await userService.updateUser({
      userId: req.user?.id,
      wordGroup: groupName,
    });
    return res.status(200).json(wordResponse);
  }
  return res.status(400).json({
    error: 'Word group already exists',
  });
});

export type UpdateWordGroupParams = {
  groupName: string;
  wordsToAdd: string[];
  wordsToDelete: string[];
};

router.put('/update', async (req: Request, res: Response) => {
  const body: UpdateWordGroupParams = req.body;
  const { groupName, wordsToAdd, wordsToDelete } = body;
  if (!req.user?.id || !groupName) {
    return res.status(401).json({
      error: 'Must provide groupName and userId',
    });
  }
  try {
    const currentWords = await wordsService.getWordsByGroupNameSimple({
      userId: req.user?.id,
      groupName,
    });
    const currentWordIdsSet = new Set(currentWords.map((word) => word.wordId.toString()));

    // Filter wordsToAdd to include only those not present in currentWordIdsSet
    const newWords = wordsToAdd.filter((wordId) => !currentWordIdsSet.has(wordId));
    await userWordsService.deleteWordsFromGroup({
      userId: req.user?.id,
      wordsToDelete,
    });
    await userWordsService.associateWordsToUser({
      userId: req.user?.id,
      wordIds: newWords,
      groupName,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
