import {Router} from 'express'
import createPost from './createPost'
import getPosts from './getPosts'
import updatePost from './updatePost'
import deletePost from './deletePost'
import getCommentsByPost from './getCommentsByPost'
import rbac from '../../middlewares/rbac'

var router = Router()

router.post('/', createPost)
router.get('/', getPosts)
router.get('/:id/comments', getCommentsByPost)
router.put('/:id', rbac("posts"), updatePost)
router.delete('/:id', rbac("posts"), deletePost)

export default router