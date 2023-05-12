"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workout_schema_1 = __importDefault(require("../workouts/workout.schema"));
const userSchema = new mongoose_1.Schema({
    "name": String,
    "password": { type: String, required: false },
    "isGoogleAuth": { type: Boolean, default: false },
    "email": { type: String, unique: true },
    "age": Number,
    "height": Number,
    "weight": Number,
    "workout": [workout_schema_1.default],
    "displayImageURL": String
});
exports.default = userSchema;
