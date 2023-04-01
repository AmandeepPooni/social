import {Router, Request} from 'express'
import createPost from './createPost'
import getPosts from './getPosts'
import updatePost from './updatePost'
import deletePost from './deletePost'
import rbac from '../../middlewares/rbac'

interface _Request extends Request {
    [x: string]: any
}

var router = Router()

router.post('/', async (req: _Request, res) => {
    res.json(await createPost(req.token.id, req.body))
})

router.get('/', async (req: _Request, res) => {
    res.json(await getPosts(req.token.id, req.query.after as string, Number(req.query.limit)))
})


router.put('/:id', rbac("posts"), async (req, res) => {
    res.json(await updatePost(req.params.id, req.body))
})

router.delete('/:id', rbac("posts"), async (req, res) => {
    res.json(await deletePost(req.params.id))
})

export default router