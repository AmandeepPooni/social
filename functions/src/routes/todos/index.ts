import {Router} from 'express'
import createTodo from './createTodo'
import getTodos from './getTodos'
import updateTodo from './updateTodo'
import deleteTodo from './deleteTodo'
import rbac from '../../middlewares/rbac'

var router = Router()

router.post('/', createTodo)
router.get('/', getTodos)
router.put('/:id', rbac("todos"), updateTodo)
router.delete('/:id', rbac("todos"), deleteTodo)

export default router