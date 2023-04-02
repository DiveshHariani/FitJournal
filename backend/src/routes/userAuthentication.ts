import express, { Request, Response } from "express";
import IUser from "../database/users/users.type";
import UserModel from '../database/users/users.model';
import {createHash, checkPassword} from '../utils/hashing';
import jwt from 'jsonwebtoken';

let router = express.Router();

/*
    TODO:
        - Create an authenticate middleware that can parse the Content-header to determine the token and check it against user.

*/

/**
 * Method: POST
 * PURPOSE: user login.
 */
router.post('/userLogin', (req: Request, res: Response) => {
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
                    res.send({"message": "Login successful", "token": token});
                } else {
                    res.status(500).json({"Message": "Internal Server Error"});
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
router.post('/user-signin', async (req, res) => {
    let {name, email, password, isGoogleAuth} = req.body;
    console.log(req.body);
    
    try {
        let hash = await createHash(password);
        
        let user: IUser = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": isGoogleAuth
        }

        let newUser = new UserModel(user);
        newUser.save()
            .then((result) => {
                console.log("Data Saved Successfully");
                res.send("User has been logged in");
            })
            .catch((err) => {
                console.log(err);
                res.send("Unsuccessfull login");
            });

    } catch(err) {
        res.send(err);
    }
});

export default router;