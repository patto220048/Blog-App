import express from 'express';
import postController from '../controller/postController.js'
import verifyToken from '../controller/verifyToken.js';
const router = express.Router()

router.get('/', postController.getPosts)

router.get('/:id', postController.getPost)

router.get('/v1/recomend/:id', postController.recomendPost)

router.post('/',verifyToken.verifyUser, postController.addPost)

router.put('/:id',verifyToken.verifyUser, postController.updatePost)

router.delete('/:id', verifyToken.verifyUser, postController.deletePost)

router.put('/like/:id',verifyToken.verifyUser, postController.likePost)

router.put('/dislike/:id',verifyToken.verifyUser, postController.dislikePost)

export default router