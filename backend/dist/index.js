"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userAuthentication_1 = __importDefault(require("./routes/userAuthentication"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
mongoose_1.default.connect(`mongodb+srv://hariani:${process.env.DB_KEY}@cluster0.kitdi7o.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then((res) => console.log("MongoDB Connected"))
    .catch((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MongoDB Connected");
    }
});
app.use('/user', userAuthentication_1.default);
app.listen(port, () => {
    console.log("Server is listening on", port);
});
