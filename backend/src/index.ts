import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from 'mongoose';

import UserLoginService from "./routes/userAuthentication";

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://hariani:${process.env.DB_KEY}@cluster0.kitdi7o.mongodb.net/?retryWrites=true&w=majority`, 
                {useNewUrlParser: true} as ConnectOptions)
        .then((res) => console.log("MongoDB Connected"))
        .catch((err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("MongoDB Connected");
            }
        });

app.use('/user', UserLoginService);

app.listen(port, () => {
    console.log("Server is listening on", port);
})