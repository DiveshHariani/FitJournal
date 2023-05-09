import { Schema } from "mongoose";
import ExerciseSchema from "../exercises/exercise.schema";
import WorkoutSchema from "../workouts/workout.schema";

const userSchema = new Schema({
    "name": String,
    "password": {type: String, required: false},
    "isGoogleAuth": {type: Boolean, default: false},
    "email": {type: String, unique: true},
    "age": Number,
    "height": Number,
    "weight": Number,
    "workout": [WorkoutSchema]
});

export default userSchema;