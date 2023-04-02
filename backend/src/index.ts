import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from "express";
import connect from './database/connection';
import bodyParser from 'body-parser';

import UserLoginService from "./routes/userAuthentication";
import UserAPI from "./routes/users";

const app = express();
app.use(express.json());

connect();

app.use('/user', UserLoginService);

app.use('/user-api', UserAPI);

app.use((req, res) => {
    res.status(400).send("URL not found" + req);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is listening on", port);
})