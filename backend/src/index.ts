import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from "express";
import connect from './database/connection';

import UserLoginService from "./routes/userAuthentication";

const app = express();
const port = process.env.PORT || 5000;

connect();

app.use('/user', UserLoginService);

app.use('/hello', (req, res) => {
    res.send("Hello")
});

app.use((req, res) => {
    res.status(400).send("URL not found" + req);
})

app.listen(port, () => {
    console.log("Server is listening on", port);
})