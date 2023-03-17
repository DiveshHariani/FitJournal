import express, { Request, Response } from "express";

let router = express.Router();

router.get('userLogin', (req: Request, res: Response) => {
    console.log("User Login activities");
    res.send("User has been logged in");
})

export default router;