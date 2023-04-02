"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./database/connection"));
const userAuthentication_1 = __importDefault(require("./routes/userAuthentication"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./middleware/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connection_1.default)();
app.use('/user', userAuthentication_1.default);
app.use('/user-api', users_1.default);
app.use('/', auth_1.default, (req, res) => {
    console.log(req.body);
    res.json({ "message": "reached URL /" });
});
app.use((req, res) => {
    res.status(400).send("URL not found" + req);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is listening on", port);
});
