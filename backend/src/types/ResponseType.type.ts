import Express from "express";
import JSONResponse from "./JSONResponse.type";
import { Send } from "express-serve-static-core";

export interface ResponseType<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}