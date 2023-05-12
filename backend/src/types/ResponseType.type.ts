import { Response } from "express";
import JSONResponse from "./JSONResponse.type";

export interface ResponseType<ResultBody> extends Response {
    JSON: JSONResponse;
}