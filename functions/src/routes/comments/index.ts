import {Router, Request} from 'express'
import createComment from './createComment'
import deleteComment from './deleteComment'
import rbac from '../../middlewares/rbac'
import getCommentsByPost from './getCommentsByPost'

interface _Request extends Request {
    [x: string]: any
}

var router = Router()

router.post('/', async (req , res) => {
    res.json(await createComment(req.body))
})

router.get('/posts/:id', async (req: _Request, res) => {
    res.json(await getCommentsByPost(req.params.id, req.query.after as string, Number(req.query.limit)))
})

router.delete('/:id', rbac("comments"), async (req , res) => {
    res.json(await deleteComment(req.params.id))
})

export default router