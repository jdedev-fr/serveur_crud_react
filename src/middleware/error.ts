import Express from 'express'

export class ExpressError extends Error {
    statusCode
    constructor(code: number, mess: string) {
        super();
        this.name = this.constructor.name
        this.message = mess
        this.statusCode = code
    }
}
export const notFound = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        console.error('route not found');

        throw new ExpressError(404, "Route non trouvée")
    }
    catch (e) {
        next(e)
    }
}
export const errorHandler = (err: ExpressError, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.error(err);

    res.status(err.statusCode || 500).send((Object.keys(err).length === 0) ? { message: "erreur inconnue" } : err)
}