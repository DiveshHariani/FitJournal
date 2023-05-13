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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let router = express_1.default.Router();
/*
    TODO:
        - Create an authenticate middleware that can parse the Content-header to determine the token and check it against user.

*/
/**
 * Method: POST
 * PURPOSE: user login.
 */
router.post('/userLogin', (req, res) => {
    let { email, password } = req.body;
    users_model_1.default.findOne({ email: email }, { password: 1 })
        .then((result_hash) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(result_hash);
        if (result_hash !== undefined) {
            let compareResult = yield (0, hashing_1.checkPassword)(password, result_hash === null || result_hash === void 0 ? void 0 : result_hash.password);
            if (compareResult === true) {
                console.log("Token: ", process.env.JWT_TOKEN);
                if (process.env.JWT_TOKEN !== undefined) {
                    let token = jsonwebtoken_1.default.sign({ user_id: result_hash === null || result_hash === void 0 ? void 0 : result_hash._id, email: email }, process.env.JWT_TOKEN);
                    res.json({ "RESULT_CODE": 0, "RESULT_MSG": "Login successful", "RESULT_DATA": { "token": token } });
                }
                else {
                    res.status(500).json({ "RESULT_CODE": -1, "RESULT_MSG": "Internal Server Error" });
                }
            }
            else
                res.send("Incorrect");
        }
    }))
        .catch((err) => res.send(err));
});
/*
    METHOD: POST
    PURPOSE: user signin
*/
router.post('/user-signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, isGoogleAuth, height = 0, weight = 0, age = 0 } = req.body;
    console.log(req.body);
    try {
        let hash = yield (0, hashing_1.createHash)(password);
        let user = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": isGoogleAuth,
            "height": height,
            "weight": weight,
            "age": age,
            "workout": []
        };
        let newUser = new users_model_1.default(user);
        newUser.save()
            .then((result) => {
            console.log(result);
            let user_id = result._id;
            if (process.env.JWT_TOKEN) {
                let token = jsonwebtoken_1.default.sign({ user_id: user_id, email: email }, process.env.JWT_TOKEN);
                res.json({ "RESULT_CODE": 0, "RESULT_MSG": "Login Successful", "RESULT_DATA": { "token": token } });
            }
            else {
                res.json({ "RESULT_CODE": -1, "RESULT_MSG": "Internal Server Error" });
            }
        })
            .catch((err) => {
            res.json({ "RESULT_CODE": -1, "RESULT_MSG": err.message });
        });
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = router;
