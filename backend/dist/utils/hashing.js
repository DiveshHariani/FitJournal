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
exports.checkPassword = exports.createHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 1;
    let passwordHash;
    const passwordPromise = new Promise((resolve, reject) => {
        bcrypt_1.default.genSalt(saltRounds, (err, salt) => {
            if (err)
                reject(err);
            bcrypt_1.default.hash(password, salt, (err, hash) => {
                if (!err) {
                    resolve(hash);
                }
                else {
                    reject(err);
                }
            });
        });
    });
    return passwordPromise;
});
exports.createHash = createHash;
const checkPassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield bcrypt_1.default.compare(password, hash);
        console.log(res);
        return Promise.resolve(res);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.checkPassword = checkPassword;
