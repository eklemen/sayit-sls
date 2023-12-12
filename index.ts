import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from './db';
import wordsRoutes from './routes/words.routes';
import userRoutes from './routes/user.routes';
import soundsRoutes from './routes/sounds.routes';
import wordGroupsRoutes from './routes/user-words.routes';
import { extractUserFromReq } from './middleware';

connectToDatabase().catch((err) => {
  throw err;
});

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(extractUserFromReq);

app.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({
    message: 'Hello from root!',
  });
});

app.get('/path', (_req, res, _next) => {
  return res.status(200).json({
    message: 'Hello from path!',
  });
});

app.use('/words', wordsRoutes);
app.use('/user', userRoutes);
app.use('/sounds', soundsRoutes);
app.use('/wordGroups', wordGroupsRoutes);

app.use((_req, res, _next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:: ', err.stack);
  res.status(500).send('Something went wrong.');
});

module.exports.handler = serverless(app);
