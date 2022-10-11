import { Request, Response } from 'express';
import { loginUser, registerNewUser } from '../services/auth';

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

const loginCtrl = async (req: Request, res: Response) => {
  const responseUser = await loginUser(req.body);

  if (responseUser === 'PASSWORD_INCORRECT') {
    res.status(403);
    res.send(responseUser);
  } else {
    res.send(responseUser);
  }
};

export { loginCtrl, registerCtrl };
