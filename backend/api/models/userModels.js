//import pool from "../config/db.js";
import con from "../config/db.js";
import { stringify } from 'flatted';

export const getAllUsersService = async () => {

  
try {
  const result = await con.query("SELECT * FROM public.\"Users\"");

  if (result.rows.length === 0) {
    console.warn("Table is empty.");
  } else {
    console.log("Result of table is", result.rows[0]);
  }

  return result.rows[0];
}

 catch (err) {
  console.error('❌ Query failed:', err.message);
}
}


export const getAllUserByIdService = async (id) =>
    {
        const result =  await con.query("SELECT * FROM toto where id = $1", [id]);
        return  result.rows[0];


    };


    

// export const createUserService = async (id, nom, prenom) => {
//   //export const createUserService = app.post('/api/user', async(req, res) =>{
//     //const { id, nom, prenom } = req.body;
//      console.log ("hello world");
//     try {
//     const result = await con.query(
        
//       "INSERT INTO toto (id, nom, prenom) VALUES ($1, $2, $3) RETURNING *",
//       [id, nom, prenom]
//     );
//     return result.rows[0]; // ✅ Return the inserted user
//   } catch (error) {
//     console.error("Error inserting user:", error.message);
//     res.status(500).send('Server error'); // rethrow to handle in controller
//   }
// };

 


  export const updateUserService = async (id, nom, prenom) =>
     {
      try {
   const result = await con.query(
 "UPDATE toto SET nom=$1, prenom=$2 WHERE id=$3 RETURNING *",
     [id, nom, prenom]
   );

    return result.rows[0];}

     catch(error)
     {
       console.log ("", error.message)
     }
     }
