import express, { Request, Response } from 'express';
import { getSounds } from '../services/sounds.service';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const filterParams = req.query.filter as string;
  const filter: string[] | null = filterParams ? JSON.parse(filterParams) : null;
  const sounds = await getSounds(filter);
  return res.status(200).json(sounds);
});

export default router;
