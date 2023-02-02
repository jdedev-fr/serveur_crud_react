import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '~/data/conn';
import { NextFunction } from 'express'
import { TypedRequestBody, TypedResponse } from '~/interfaces';
import { User } from '~/model/user';
import { ExpressError } from './error';

export const checkToken = (req: TypedRequestBody<{}, {}>, res: TypedResponse<{}>, next: NextFunction) => {
    try {
        let token = ""
        if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, SECRET_TOKEN) as User;
            console.log(decoded);
            if (decoded) {
                req.user = decoded
                next()
            }
            else {
                throw new ExpressError(401, "route protégée")
            }
        } else {
            throw new ExpressError(401, "route protégée")
        }
    } catch (e) {
        next(e)
    }
}