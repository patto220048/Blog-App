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
    origin : 'http://localhost:5173',
    credentials: true,
}))
//handle err
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'something went wrong!';
    return res.status(status).json({
      success: false,
      status,
      message
    })
})

db.connect(function(err) {
    if (err) return console.log(err.sqlMessage)
    console.log("Connected!");
  });

route(app);

app.listen(3000, ()=>{
    console.log("Connect to backend! http://localhost:3000")
})