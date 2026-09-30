import express from "express"
import {getAllUsersService, updateUserService } from "../../models/userModels.js";

const router = express.Router();

router.get("/user", getAllUsersService);
//router.post("/user", createUserService);

//router.delete("api/user/:id", deleteUserService);
router.put("/user/:id", updateUserService);

export default router;
