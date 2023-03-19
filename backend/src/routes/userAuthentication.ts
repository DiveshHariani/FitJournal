import express, { Request, Response } from "express";
import IUser from "../database/users/users.type";
import UserModel from '../database/users/users.model';

let router = express.Router();

router.get('/userLogin', (req: Request, res: Response) => {
    console.log("User Login activities");
    let loginData: IUser = {
        "name": "Divesh",
        "email" : 'divesh@gmail.com',
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
    .then((res) => console.log("Data Saved Successfully"))
    .catch((err) => console.log(err));

    res.send("User has been logged in");
})

export default router;