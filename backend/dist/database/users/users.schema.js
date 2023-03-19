"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    "name": String,
    "password": { type: String, required: false },
    "isGoogleAuth": { type: Boolean, default: false },
    "email": { type: String, unique: true },
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
exports.default = userSchema;
