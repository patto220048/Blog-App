import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "dinhhuuphat",
    database : "test",
})

export default db
