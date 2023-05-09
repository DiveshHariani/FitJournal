"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const users_model_1 = __importDefault(require("../database/users/users.model"));
const router = (0, express_1.Router)();
/*
    METHOD: GET
    ROUTE: /
    FUNC: Retrieve all the workouts
    AUTH: required
*/
router.get('/', [auth_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.authentication.email;
    try {
        let user = yield users_model_1.default.findOne({ email: email });
        if (user) {
            let workouts = user.workout;
            console.log(workouts);
            res.json(workouts);
        }
    }
    catch (err) {
        console.log(err);
        res.json(err.message);
    }
}));
/*
    METHOD: POST
    ROUTE: /
    FUNC: Insert a Workout
    AUTH: required
*/
router.post('/', [auth_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.authentication.email;
    let workout = req.body.workoutDetail;
    try {
        let result = yield users_model_1.default.updateOne({ email: email }, { $push: { "workout": workout } });
        if (result.acknowledged)
            res.send(result);
        else {
            console.log(result);
            res.status(500).send("Internal Server Error");
        }
    }
    catch (err) {
        res.send(err.message);
    }
}));
/*
    METHOD: GET
    ROUTE: /:id
    FUNC: Retrieve one workout on workoutID
    AUTH: required
*/
router.get("/:id", [auth_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let workoutID = req.params.id;
    let email = req.body.authentication.email;
    try {
        let result = yield users_model_1.default.findOne({ "workout": { $elemMatch: { "_id": workoutID } }, "email": email }, { "workout.$": 1 });
        if (result) {
            res.json(result);
        }
        else {
            console.log(result);
            res.status(500).send("Internal Server Error");
        }
    }
    catch (err) {
        res.send(err.message);
    }
}));
/*
    METHOD: DELETE
    ROUTE: /:id
    FUNC: Delete one workout with given workout ID
    AUTH: required
*/
router.delete("/:id", [auth_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let workoutID = req.params.id;
    let email = req.body.authentication.email;
    console.log(workoutID, email);
    try {
        let result = yield users_model_1.default.updateOne({ "email": email }, { $pull: { "workout": { "_id": workoutID } } });
        if (result) {
            console.log(result);
            res.json("Deleted");
        }
        else {
            res.send(result);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}));
// TODO: PUT, PATCH
exports.default = router;
