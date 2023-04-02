import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token) {
        res.status(403).json({"message": "authentication is required"});
    } else {
        try {
            if(process.env.JWT_TOKEN) {
                let decoded = jwt.verify(token, process.env.JWT_TOKEN);
                req.body.authentication = decoded;
                next();
            } else {
                res.status(500).json({"message": "Internal Server Error"});
            }
        } catch(err) {
            res.status(401).json({"message": "Invalid token"});
        }
    }
}

export default verifyToken;