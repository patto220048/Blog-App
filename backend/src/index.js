import express from "express";
import cookieParser from "cookie-parser";
import db from "./database/db.js"
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
//route
import route from './route/index.js';
dotenv.config()

const app = express()

app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin : 'https://localhost:3000',
    credentials: true,
}))

db.connect(function(err) {
    if (err) return console.log(err.sqlMessage)
    console.log("Connected!");
  });

route(app);

app.listen(3000, ()=>{
    console.log("Connect to backend! http://localhost:3000")
})