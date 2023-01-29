import { Send } from "express-serve-static-core"

export interface TypedRequestBody<T, P> extends Express.Request {
    params: P
    body: T
}
export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}
