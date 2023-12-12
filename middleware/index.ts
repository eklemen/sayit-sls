import type { Request, Response, NextFunction } from 'express';

export function extractUserFromReq(req: Request, res: Response, next: NextFunction) {
  const apiToken = req.headers.apitoken as string;
  if (apiToken) {
    req.user = { id: apiToken || '' };
  }
  next();
}
