import { TypedRequestBody, TypedResponse } from "~/interfaces"
import { User } from "~/model/user"
import { NextFunction } from 'express'
import { ExpressError } from "~/middleware/error"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from "~/data/conn"

export class CUser {

    static login = async (request: TypedRequestBody<User, {}>, response: TypedResponse<{ token: string }>, next: NextFunction) => {
        try {

            const findUser = await User.findOne({ where: { email: request.body.email } })
            if (findUser) {
                const check = bcrypt.compareSync("" + request.body.password, findUser.password)
                if (check) {
                    response.json({ token: jwt.sign(findUser.dataValues, SECRET_TOKEN) })
                }
                else throw new ExpressError(401, "Utilisateur ou mot de passe inconnus")
            }
            else throw new ExpressError(401, "Utilisateur ou mot de passe inconnus")

        } catch (e: any) {
            next(e)
        }
    }

}