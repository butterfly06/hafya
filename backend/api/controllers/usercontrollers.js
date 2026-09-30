import { createUserService, getAllUsersService } from "../models/userModels";

// const handleResponse = (res, status, message, data=null)=>{
//     res.status(status).json({
// status,
// message,
// data,

//     })
// };



// export const createUser = async (req, res, next) => {
//     //const {id,  nom, prenom} = req.body;
//     console.log ("create user here", req.body )
//     try {
//         const newUser= await createUserService(id, nom, prenom);
//         handleResponse(res, 201, "User created successfully", newUser)
//     } catch (err) {
//         next(err)
//     }
// };



export const getAllUsers = async (req, res, next) => {
    try {
        const users= await getAllUsersService();
        handleResponse(res, 200, "Users fetched successfully", users)
    } catch (err) {
        next(err)
    }
};

 export const createUserService = async (req, res, next) => {
     const {nom, prenom} = req.body
     try {
         const newUser= await createUserService(nom, prenom );
         handleResponse(res, 201, "Users created successfully", newUser)
     } catch (err) {
         next(err)
     }
 };
