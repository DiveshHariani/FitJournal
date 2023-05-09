import { Schema } from "mongoose";

const ExerciseSchema = new Schema({
    "exercise_name": String,
    "sets": [{
        "weight_lifted": Number,
        "number_of_reps": Number
    }]
});

export default ExerciseSchema;