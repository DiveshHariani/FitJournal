"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exercise_schema_1 = __importDefault(require("../exercises/exercise.schema"));
const WorkoutSchema = new mongoose_1.Schema({
    name: String,
    date: Date,
    exercises: [exercise_schema_1.default]
});
exports.default = WorkoutSchema;
