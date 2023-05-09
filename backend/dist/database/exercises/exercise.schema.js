"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExerciseSchema = new mongoose_1.Schema({
    "exercise_name": String,
    "sets": [{
            "weight_lifted": Number,
            "number_of_reps": Number
        }]
});
exports.default = ExerciseSchema;
