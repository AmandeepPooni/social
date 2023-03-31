import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { Todo } from '../../interfaces/todos'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    body: Todo
}

interface _Reponse extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Reponse) {
    const db = getFirestore()
    let todoRef = db.collection('todos').doc()
    let todo = req.body
    let newTodo: Todo = {
        id: todoRef.id,
        content: todo.content,
        status: todo.status,
        author: 'abc',
        created: Date.now()
    }
    await todoRef.set(newTodo)
    res.json("Todo created with ID: " + todoRef.id)
}