import {Router} from 'express'
import createComment from './createComment'
import deleteComment from './deleteComment'
import rbac from '../../middlewares/rbac'

var router = Router()

router.post('/', createComment)
router.delete('/:id', rbac("comments"), deleteComment)

export default router