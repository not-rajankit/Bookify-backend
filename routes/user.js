

import express from "express"
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userControllers.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"


const router=express.Router()



// router.put('/:id',verifyUser,updateUser)

// router.delete('/:id',verifyUser,deleteUser)

// router.get('/',verifyAdmin,getAllUser)

// router.get('/:id',verifyUser,getSingleUser)

export default router;