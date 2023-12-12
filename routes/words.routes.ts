import express, { Request, Response } from 'express';
const router = express.Router();
import * as wordsService from '../services/words.service';
import type { CreateWordParams } from '../services/words.service';
import * as userWordsService from '../services/user-words.service';

router.get('/', async (req: Request, res: Response) => {
  const userId = req.headers.apitoken as string;
  const groupName = req.query.groupName as string;
  if (!groupName) {
    return res.status(400).json({
      error: 'groupName is required',
    });
  }
  const data = await wordsService.getWordsByGroupName({ userId, groupName });

  return res.status(200).json(data);
});

router.get('/all', async (req: Request, res: Response) => {
  const data = await wordsService.getAllWords();
  return res.status(200).json(data);
});

// TODO: protect route
router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const { word, fullAudio, sounds } = body;
  const createWordParams: CreateWordParams = {
    word,
    fullAudio,
    sounds,
  };
  const wordResponse = await wordsService.createWord(createWordParams);
  return res.status(200).json(wordResponse);
});

router.post('/assign', async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.user?.id || '';
  const { wordIds, groupName } = body;
  try {
    const associateResponse = await userWordsService.associateWordsToUser({
      userId,
      wordIds,
      groupName,
    });
    return res.status(200).json(associateResponse);
  } catch (err) {
    if (err?.message.includes('duplicate key')) {
      return res.status(400).json({
        error: 'Word already exists in this group.',
      });
    }
    return res.status(500).json(err);
  }
});
export default router;
