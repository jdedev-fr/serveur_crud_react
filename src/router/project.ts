import express from 'express';
import { CProject } from '~/controler/project';
import { checkToken } from '~/middleware/checkToken';
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

export const projectRouter = express.Router();

projectRouter.get('/', checkToken as any, CProject.getAll)
projectRouter.get('/:id', checkToken as any, CProject.getById as any)
projectRouter.post('/', checkToken as any, upload.single('image'), CProject.add as any)
projectRouter.put('/:id', checkToken as any, upload.single('image'), CProject.update as any)
projectRouter.delete('/:id', checkToken as any, CProject.delete as any)

