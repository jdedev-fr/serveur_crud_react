import { TypedRequestBody, TypedResponse } from "~/interfaces"
import { User } from "~/model/user"
import { NextFunction } from 'express'
import { ExpressError } from "~/middleware/error"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from "~/data/conn"

export class CUser {
    static getAll = async (request: Express.Request, response: TypedResponse<User[]>) => {
        const users = await User.findAll()
        response.json(users)
    }
    static getById = async (request: TypedRequestBody<{}, { id: number }>, response: TypedResponse<User>, next: NextFunction) => {
        const user = await User.findByPk(request.params.id)
        try {
            if (user) response.json(user)
            else throw new ExpressError(410, "Utilisateur non trouvé")
        } catch (e) {
            next(e)
        }
    }
    static add = async (request: TypedRequestBody<User, {}>, response: TypedResponse<User>, next: NextFunction) => {
        try {
            (request.body);

            const newUser = await User.create(request.body)
            response.json(newUser)
        } catch (e: any) {
            next(e)
        }
    }
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
    static update = async (request: TypedRequestBody<User, { id: number }>, response: TypedResponse<User>, next: NextFunction) => {
        try {
            const bddUser = await User.findByPk(request.params.id)
            if (bddUser) {
                try {
                    const newUser = await bddUser.update(request.body)
                    response.json(newUser)
                } catch (e: any) {
                    next(e)
                }
            }
            else throw new ExpressError(410, "Utilisateur non trouvé")
        } catch (e) {
            next(e)
        }
    }
    static delete = async (request: TypedRequestBody<{}, { id: number }>, response: TypedResponse<{ mess: string }>, next: NextFunction) => {
        try {
            const bddUser = await User.findByPk(request.params.id)
            if (bddUser) {
                await bddUser.destroy()
                throw new ExpressError(200, "Utilisateur supprimé")
            }
            else throw new ExpressError(410, "Utilisateur non trouvé")
        } catch (e) {
            next(e)
        }
    }
}