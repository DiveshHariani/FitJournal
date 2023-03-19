"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const users_schema_1 = __importDefault(require("./users.schema"));
exports.default = (0, mongoose_1.model)("user", users_schema_1.default);
