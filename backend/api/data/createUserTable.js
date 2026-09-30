import con from "../config/db.js";

const createUserTable = async () => {

const queryText = `CREATE TABLE IF NOT EXIST USERS (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    adresse VARCHAR(100),
    created_at TIMESTAMP DEFAUT NOW()
)`;
const createUserTable = async () =>{
 try {
    con.connect();  
    con.on(queryText);
      console.log(" User table created if not exists");
 } catch (error) {
    console.log(" Error creating users table: ", error);}
 
}
}

export default createUserTable;