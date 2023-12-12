import express, { Request, Response } from 'express';
const router = express.Router();
import * as userService from '../services/user.service';

router.get('/', async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const user = await userService.getUserByEmail(email);

  return res.status(200).json(user);
});

export default router;
