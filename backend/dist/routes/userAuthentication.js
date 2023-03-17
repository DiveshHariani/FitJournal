"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
router.get('userLogin', (req, res) => {
    console.log("User Login activities");
    res.send("User has been logged in");
});
exports.default = router;
