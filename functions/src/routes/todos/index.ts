import { Router, Request } from 'express'
import createTodo from './createTodo'
import getTodos from './getTodos'
import updateTodo from './updateTodo'
import deleteTodo from './deleteTodo'
import rbac from '../../middlewares/rbac'

interface _Request extends Request {
    [x: string]: any
}

var router = Router()

router.post('/', async (req: _Request, res) => {
    res.json(await createTodo(req.token.id, req.body))
})

router.get('/', async (req: _Request, res) => {
    let authorId = null
    if(req.query.author){
        authorId = req.query.author as string
    }
    res.json(await getTodos(authorId, req.query.after as string, Number(req.query.limit)))
})

router.put('/:id', rbac("todos"), async (req, res) => {
    res.json(await updateTodo(req.params.id, req.body))
})

router.delete('/:id', rbac("todos"), async (req, res) => {
    res.json(await deleteTodo(req.params.id))
})

export default router