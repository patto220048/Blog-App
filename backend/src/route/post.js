import express from 'express';
import postController from '../controller/postController.js'
const router = express.Router()

router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)
router.post('/', postController.addPost)
router.delete('/:id', postController.deletePost)
router.put('/:id', postController.updatePost)

export default router