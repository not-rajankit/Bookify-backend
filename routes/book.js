

import express from "express"
import { createBook, updateBook, deleteBook, getSingleBook, getAllBook, getBookBySearch,getPopularBooks,getBooksCount} from "../controllers/bookController.js"
import { verifyAdmin } from "../utils/verifyToken.js"


const router=express.Router()


router.post('/',verifyAdmin,createBook)

router.put('/:id',verifyAdmin,updateBook)

router.delete('/:id',verifyAdmin,deleteBook)

router.get('/',getAllBook)

router.get('/:id',getSingleBook)

router.get('/search/getBookBySearch',getBookBySearch)
router.get('/search/getPopularBooks',getPopularBooks)
router.get('/search/getBooksCount',getBooksCount)
export default router;