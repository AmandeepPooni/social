import {Router} from 'express'
import createComment from './createComment'
import updateComment from './updateComment'
import deleteComment from './deleteComment'

var router = Router()

router.post('/', createComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

export default router