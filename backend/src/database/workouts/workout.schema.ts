import { Schema } from "mongoose";
import ExerciseSchema from "../exercises/exercise.schema";

const WorkoutSchema = new Schema({
    name: String,
    date: Date,
    exercises: [ExerciseSchema]
})

export default WorkoutSchema;