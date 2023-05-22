"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let databaseConnection;
const connect = () => {
    const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.kitdi7o.mongodb.net/?retryWrites=true&w=majority`;
    if (databaseConnection)
        return;
    mongoose_1.default.connect(URI, { useNewUrlParser: true })
        .then((res) => console.log("MongoDB Connected"))
        .catch((err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("MongoDB Connected");
        }
    });
    return;
};
exports.default = connect;
