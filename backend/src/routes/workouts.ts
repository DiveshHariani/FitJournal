import express, {Router} from 'express';
import { ObjectId } from 'mongoose';

import verifyToken from '../middleware/auth';
import { IWorkout } from '../database/workouts/workout.type';
import usersModel from '../database/users/users.model';
import IUser from '../database/users/users.type';

const router = Router();

/*
    METHOD: GET
    ROUTE: /
    FUNC: Retrieve all the workouts
    AUTH: required
*/
router.get('/', [verifyToken], async (req: express.Request, res: express.Response) => {
    let email: string = req.body.authentication.email
    try {
        let user: IUser | null = await usersModel.findOne({email: email});
        if(user) {
            let workouts: IWorkout[] = user.workout;
            console.log(workouts)
            res.json(workouts);
        }
    } catch(err) {
        console.log(err);
        res.json(err.message);
    }
});

/*
    METHOD: POST
    ROUTE: /
    FUNC: Insert a Workout
    AUTH: required
*/
router.post('/', [verifyToken], async (req: express.Request, res: express.Response) => {
    let email: string = req.body.authentication.email;
    let workout: IWorkout = req.body.workoutDetail;

    try {
        let result = await usersModel.updateOne({email: email}, {$push: {"workout": workout}});
        if(result.acknowledged)
            res.send(result);
        else {
            console.log(result);
            res.status(500).send("Internal Server Error");
        }
    } catch(err) {
        res.send(err.message);
    }
});

/*
    METHOD: GET
    ROUTE: /:id
    FUNC: Retrieve one workout on workoutID
    AUTH: required
*/
router.get("/:id", [verifyToken], async (req: express.Request, res: express.Response) => {
    let workoutID = req.params.id;
    let email = req.body.authentication.email;
    try {
        let result = await usersModel.findOne({"workout": { $elemMatch: {"_id" : workoutID}}, "email": email}, {"workout.$": 1});
        if(result) {
            res.json(result);
        } else {
            console.log(result);
            res.status(500).send("Internal Server Error");
        }
    } catch(err) {
        res.send(err.message);
    }
});

/*
    METHOD: DELETE
    ROUTE: /:id
    FUNC: Delete one workout with given workout ID
    AUTH: required
*/
router.delete("/:id", [verifyToken], async (req: express.Request, res: express.Response) => {
    let workoutID = req.params.id;
    let email = req.body.authentication.email;
    console.log(workoutID, email);
    try {
        let result = await usersModel.updateOne({"email": email}, {$pull: {"workout": {"_id": workoutID}}});
        if(result) {
            console.log(result);
            res.json("Deleted");
        } else {
            res.send(result);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
});


// TODO: PUT, PATCH

export default router;