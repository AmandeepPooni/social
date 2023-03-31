import {Router} from 'express'
import createPost from './createPost'
import getPosts from './getPosts'
import updatePost from './updatePost'
import deletePost from './deletePost'
import getCommentsByPost from './getCommentsByPost'

var router = Router()

router.post('/', createPost)
router.get('/', getPosts)
router.get('/:id/comments', getCommentsByPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router