import express from 'express'
const router = express.Router()
import { createPost, getPost, getPosts, removePost, updatePost } from '../controllers/postControllers.js'

//using querys
router.get('/',getPosts);

//GET single post
router.get('/:id',getPost);


// create new post
router.post('/',createPost);

//update
router.put('/:id',updatePost);

router.delete('/:id',removePost);

export default router;
