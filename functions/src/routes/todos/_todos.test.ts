const { initializeApp, cert } = require('firebase-admin/app')
import testServiceAccount from '../../../privateKey.json'
import { Todo } from '../../interfaces/todos'
import createTodo from './createTodo'
import deleteTodo from './deleteTodo'
import getTodos from './getTodos'
import updateTodo from './updateTodo'

beforeAll(() => {
    return initializeApp({
        credential: cert(testServiceAccount)
    })
})

describe("Todos module", () => {

    const testTodo: Todo = {
        id: '',
        content: '__testcontent__',
        status: '',
        author: '__testauthor__'+Date.now(),
        created: 0
    }

    let testTodoId = ""

    it("Should create a new todo", async () => {
        const result = await createTodo(testTodo.author, testTodo)
        testTodoId = result.id
        expect(typeof result.id).toBe("string")
    })

    it("Should get todos", async () => {
        const result = await getTodos(testTodo.author, "", 0)
        expect(result.some(todo=>todo.content===testTodo.content)).toBe(true)
    })

    it("Should update the todo", async () => {
        const result = await updateTodo(testTodoId, testTodo)
        expect(result).toBe(true)
    })

    it("Should delete the todo", async () => {
        const result = await deleteTodo(testTodoId)
        expect(result).toBe(true)
    })

})