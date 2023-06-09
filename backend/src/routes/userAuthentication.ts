import express, { Application, Request, Response } from "express";
import IUser from "../database/users/users.type";
import UserModel from '../database/users/users.model';
import {createHash, checkPassword} from '../utils/hashing';
import { ResponseType } from "../types/ResponseType.type";
import jwt from 'jsonwebtoken';
import JSONResponse from "../types/JSONResponse.type";

let router = express.Router();

/*
    TODO:
        - Create an authenticate middleware that can parse the Content-header to determine the token and check it against user.

*/

/**
 * Method: POST
 * PURPOSE: user login.
 */
router.post('/userLogin', (req: Request, res: ResponseType<JSONResponse>) => {
    let { email, password } = req.body;
    
    UserModel.findOne({email: email}, {password : 1})
    .then(async (result_hash) => {
        console.log(result_hash);
        if(result_hash !== undefined) {
            let compareResult = await checkPassword(password, result_hash?.password as string);
            if(compareResult === true)  {
                console.log("Token: ", process.env.JWT_TOKEN)
                if(process.env.JWT_TOKEN !== undefined) {
                    let token: string = jwt.sign({user_id: result_hash?._id, email: email}, process.env.JWT_TOKEN);
                    res.json({"RESULT_CODE": 0, "RESULT_MSG": "Login successful", "RESULT_DATA": {"token": token}});
                } else {
                    res.status(500).json({"RESULT_CODE": -1, "RESULT_MSG": "Internal Server Error"});
                }
            }
            else res.send("Incorrect");
        }
    })
    .catch((err) => res.send(err));
});


/*
    METHOD: POST
    PURPOSE: user signin
*/
router.post('/user-signin', async (req: Request, res: ResponseType<JSONResponse>) => {
    let {name, email, password, isGoogleAuth, height = 0, weight = 0, age = 0} = req.body;
    console.log(req.body);
    
    try {
        let hash = await createHash(password);
        
        let user: IUser = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": isGoogleAuth,
            "height": height,
            "weight": weight,
            "age": age,
            "workout": []
        }

        let newUser = new UserModel(user);
        newUser.save()
            .then((result) => {
                console.log(result);
                let user_id = result._id;
                if(process.env.JWT_TOKEN) {
                    let token = jwt.sign({user_id: user_id, email: email}, process.env.JWT_TOKEN)
                    res.json({"RESULT_CODE": 0, "RESULT_MSG": "Login Successful", "RESULT_DATA": {"token": token}});
                } else {
                    res.json({"RESULT_CODE": -1, "RESULT_MSG": "Internal Server Error"})
                }
            })
            .catch((err) => {
                res.json({"RESULT_CODE": -1, "RESULT_MSG": err.message});
            });

    } catch(err) {
        res.send(err);
    }
});

export default router;