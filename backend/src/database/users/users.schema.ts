import { Schema } from "mongoose";

const userSchema = new Schema({
    "name": String,
    "email": String,
    "age": Number,
    "height": Number,
    "weight": Number,
    "workout": [{
        "name": String,
        "date": Date,
        "exercises": [
            {
                "exercise_name": String,
                "sets": [{
                    "weight_lifted": Number,
                    "number_of_reps": Number
                }]
            }
        ]
    }]
});

export default userSchema;