import express from 'express';
import { CUser } from '~/controler/user';
import { notFound } from '~/middleware/error';

export const userRouter = express.Router();

userRouter.get('/', CUser.getAll)
userRouter.get('/:id', CUser.getById)
userRouter.post('/', CUser.add)
userRouter.post('/login', CUser.login)
userRouter.put('/:id', CUser.update)
userRouter.delete('/:id', CUser.delete)

