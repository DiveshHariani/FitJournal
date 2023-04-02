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
const users_model_1 = __importDefault(require("../database/users/users.model"));
const hashing_1 = require("../utils/hashing");
let router = (0, express_1.Router)();
/**
 * METHOD: GET
 * PURPOSE: sends all the users
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield users_model_1.default.find();
        res.send({ 'users': users });
    }
    catch (err) {
        res.send(err.message);
    }
}));
/**
 * METHOD: POST
 * PURPOSE: Create a user.
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, isGoogleAuth } = req.body;
    try {
        let hash = yield (0, hashing_1.createHash)(password);
        let user = {
            "name": name,
            "email": email,
            "password": hash,
            "isGoogleAuth": isGoogleAuth
        };
        let newUser = new users_model_1.default(user);
        newUser.save()
            .then((response) => res.send("User saved successfully"))
            .catch((err) => console.log(err));
    }
    catch (err) {
        res.send(err.message);
    }
}));
/**
 * METHOD: GET /:id
 * PURPOSE: Fetch details of user with id
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.id;
    res.send(userId);
}));
/**
 * METHOD: PUT /:id
 * PURPOSE: Change the user details(full object) with id
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
/**
 * METHOD: PATCH /:id
 * PURPOSE: Update field(s) for the user with id
 */
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
/**
 * METHOD: DELETE /:id
 * PURPOSE: Delete a user with id
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = router;
