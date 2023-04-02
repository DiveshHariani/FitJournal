"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        res.status(403).json({ "message": "authentication is required" });
    }
    else {
        try {
            if (process.env.JWT_TOKEN) {
                let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
                req.body.authentication = decoded;
                next();
            }
            else {
                res.status(500).json({ "message": "Internal Server Error" });
            }
        }
        catch (err) {
            res.status(401).json({ "message": "Invalid token" });
        }
    }
};
exports.default = verifyToken;
