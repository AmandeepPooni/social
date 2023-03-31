import {Router} from 'express'
import createComment from './createComment'
import deleteComment from './deleteComment'

var router = Router()

router.post('/', createComment)
router.delete('/:id', deleteComment)

export default router