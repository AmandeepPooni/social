import {Router} from 'express'
import createTodo from './createTodo'
import getTodos from './getTodos'
import updateTodo from './updateTodo'
import deleteTodo from './deleteTodo'

var router = Router()

router.post('/', createTodo)
router.get('/', getTodos)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router