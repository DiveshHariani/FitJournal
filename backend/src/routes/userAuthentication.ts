import express, { Request, Response } from "express";
import IUser from "../database/users/users.type";
import UserModel from '../database/users/users.model';
import {createHash, checkPassword} from '../utils/hashing';

let router = express.Router();

router.post('/userLogin', (req: Request, res: Response) => {
    let { email, password } = req.body;
    UserModel.findOne({email: email}, {password : 1})
    .then(async (result_hash) => {
        console.log(result_hash);
        if(result_hash !== undefined) {
            console.log(result_hash?.password, password);
            let compareResult = await checkPassword(password, result_hash?.password as string);
            console.log(compareResult);
            if(compareResult === true)  res.send("Logged in successfully");
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
    let {name, email, password} = req.body;
    console.log(req.body);
    
    try {
        let hash = await createHash(password);
        
        let user: IUser = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": false
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
})

export default router;