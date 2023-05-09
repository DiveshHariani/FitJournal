import { IWorkout } from "../workouts/workout.type";

export interface IUser {
    "name": String,
    "password"?: String,
    "isGoogleAuth"?: Boolean,
    "email": String,
    "age"?: Number,
    "height"?: Number,
    "weight"?: Number,
    "workout": IWorkout[] | []
};

export default IUser;