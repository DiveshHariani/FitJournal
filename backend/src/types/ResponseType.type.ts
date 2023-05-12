import { Response } from "express";
import JSONResponse from "./JSONResponse";

export interface ResponseType extends Response {
    JSON: JSONResponse;
}