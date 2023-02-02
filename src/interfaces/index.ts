import { Send } from "express-serve-static-core"
import { User } from "~/model/user"

export interface TypedRequestBody<T, P> extends Express.Request {
    user: User
    headers: { authorization: string }
    params: P
    body: T
}
export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}
