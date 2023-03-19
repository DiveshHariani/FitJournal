import express, { Request, Response } from "express";
import IUser from "../database/users/users.type";
import UserModel from '../database/users/users.model';
import {createHash, checkPassword} from '../utils/hashing';

let router = express.Router();

router.get('/userLogin', (req: Request, res: Response) => {
    console.log("User Login activities");
    let loginData: IUser = {
        "name": "Divesh",
        "password": "abcdef",
        "email": 'divesh@gmail.com',
        "age": 21,
        "height": 174,
        "weight": 78,
        "workout": [{
            "name": "Push",
            "date": new Date(),
            "exercises": [
                {
                    "exercise_name": "Chest Press",
                    "sets": [{
                        "weight_lifted": 12,
                        "number_of_reps": 12
                    }]
                }
            ]
        }]
    }

    let user = new UserModel(loginData)
    user.save()
        .then((result) => {
            console.log("Data Saved Successfully");
            res.send("User has been logged in");
        })
        .catch((err) => {
            console.log(err);
            res.send("Unsuccessfull login");
        });

    
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