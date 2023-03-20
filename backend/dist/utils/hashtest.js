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
Object.defineProperty(exports, "__esModule", { value: true });
const hashing_1 = require("./hashing");
const checker = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield (0, hashing_1.checkPassword)("1234", "$2b$04$Snz8mrEMNNqBuwf6P0kLE.V7GDiXQeClE0IAqCtQxhwX2gCOv9xya");
    console.log(result);
});
checker();
