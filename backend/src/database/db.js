import * as dotenv from 'dotenv';
import mysql from "mysql";
dotenv.config()

const db = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    user : "root",
    password : process.env.PASS_MYSQL,
    database : "test",
})

export default db
