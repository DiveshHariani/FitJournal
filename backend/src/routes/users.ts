import express, { Router } from "express";
import IUser from "../database/users/users.type";
import UserModel from "../database/users/users.model";
import { createHash } from "../utils/hashing";
import verifyToken from "../middleware/auth";

let router = Router()

/**
 * METHOD: GET
 * PURPOSE: sends all the users
 */
router.get('/', [verifyToken], async (req: express.Request, res: express.Response) => {
    try {
        let users: IUser[] = await UserModel.find();
        res.send({'users': users})
    } catch(err) {
        res.send(err.message);
    }
});

/**
 * METHOD: POST
 * PURPOSE: Create a user.
 */
router.post('/', async (req: express.Request, res: express.Response) => {
    let { name, email, password, isGoogleAuth } = req.body;
    try {
        let hash: string = await createHash(password);

        let user: IUser = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": isGoogleAuth,
            "workout": []
        }

        let newUser = new UserModel(user);
        newUser.save()
                .then((response) => res.send("User saved successfully"))
                .catch((err) => console.log(err));
    } catch(err) {
        res.send(err.message);
    }
});

/**
 * METHOD: GET /:id
 * PURPOSE: Fetch details of user with id
 */
router.get('/:id', [verifyToken], async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    let userId = req.params.id;
    try {
        let user: IUser | null = await UserModel.findOne({email: userId});
        res.send(user);
    } catch(err) {
        res.send(err.message);
    }

})

/**
 * METHOD: PUT /:id
 * PURPOSE: Change the user details(full object) with id
 */
router.put('/:id', async (req, res) => {
    try {
        let userId: string = req.params.id;
        let updatedData: IUser = req.body;

        const result = await UserModel.updateOne({email: userId}, updatedData, {new: true});
        res.send(result);
    } catch(err) {
        res.send(err.message)
    }
})

/**
 * METHOD: PATCH /:id
 * PURPOSE: Update field(s) for the user with id
 */
router.patch('/:id', async (req, res) => {
    try {
        let userId: string = req.params.id;
        let updatedData = req.body;

        const result = await UserModel.updateOne({email: userId}, updatedData, {new: true});
        res.send(result);
    } catch(err) {
        res.send(err.message)
    }
});

/**
 * METHOD: DELETE /:id
 * PURPOSE: Delete a user with id
 */
router.delete('/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let result = await UserModel.deleteOne({email: userId});
        res.send("Data Deleted")
    } catch(err) {
        res.send(err.message);
    }
});

export default router;