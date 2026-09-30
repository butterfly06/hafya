import pkg, { Client, Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' })
console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
console.log(process.env.DB_DATABASE);
console.log(process.env.DB_PORT);

const con = new Pool ({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
password: process.env.DB_PASSWORD,
port: process.env.DB_PORT,
})

con.connect();
con.on("connect", () =>{
    console.log("Connection con establised with database")
})
 con.query('select * from Users', (err, res) =>{

     if (!err){
         console.log(res.rows);

     } else
     { 
         console.log(err.message);
     }
     con.end;
 })

//const pool = new Pool();
//modules.exports = pool;
export default con;
