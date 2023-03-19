"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_model_1 = __importDefault(require("../database/users/users.model"));
let router = express_1.default.Router();
router.get('/userLogin', (req, res) => {
    console.log("User Login activities");
    let loginData = {
        "name": "Divesh",
        "email": 'divesh@gmail.com',
        "age": 21,
        "height": 174,
        "weight": 78,
        "workout": [{
                "name": "Push",
                "date": new Date(),
                "exercises": [
                    {
                        "exercise_name": "Chest Press",
                        "sets": [{
                                "weight_lifted": 12,
                                "number_of_reps": 12
                            }]
                    }
                ]
            }]
    };
    let user = new users_model_1.default(loginData);
    user.save()
        .then((res) => console.log("Data Saved Successfully"))
        .catch((err) => console.log(err));
    res.send("User has been logged in");
});
exports.default = router;
