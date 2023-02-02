import express from 'express';
import { CUser } from '~/controler/user';
import { checkToken } from '~/middleware/checkToken';

export const userRouter = express.Router();

userRouter.get('/', checkToken as any, CUser.getAll)
userRouter.get('/:id', checkToken as any, CUser.getById as any)
userRouter.post('/', CUser.add as any)
userRouter.post('/login', CUser.login as any)
userRouter.put('/:id', checkToken as any, CUser.update as any)
userRouter.delete('/:id', checkToken as any, CUser.delete as any)

