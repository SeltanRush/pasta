import { Request } from 'express';

const getUserIdByRequest = (req: Request) => {
  req.headers.authorization;
};
