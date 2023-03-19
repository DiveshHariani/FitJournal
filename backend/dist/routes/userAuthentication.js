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
const express_1 = __importDefault(require("express"));
const users_model_1 = __importDefault(require("../database/users/users.model"));
const hashing_1 = require("../utils/hashing");
let router = express_1.default.Router();
router.get('/userLogin', (req, res) => {
    console.log("User Login activities");
    let loginData = {
        "name": "Divesh",
        "password": "abcdef",
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
        .then((result) => {
        console.log("Data Saved Successfully");
        res.send("User has been logged in");
    })
        .catch((err) => {
        console.log(err);
        res.send("Unsuccessfull login");
    });
});
/*
    METHOD: POST
    PURPOSE: user signin
*/
router.post('/user-signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    console.log(req.body);
    try {
        let hash = yield (0, hashing_1.createHash)(password);
        let user = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": false
        };
        let newUser = new users_model_1.default(user);
        newUser.save()
            .then((result) => {
            console.log("Data Saved Successfully");
            res.send("User has been logged in");
        })
            .catch((err) => {
            console.log(err);
            res.send("Unsuccessfull login");
        });
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = router;
