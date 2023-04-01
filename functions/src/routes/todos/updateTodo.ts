import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { Todo } from '../../interfaces/todos'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    body: Todo
}

interface _Response extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Response) {
    const db = getFirestore()
    const todoId = req.params.id
    let todoRef = db.collection('todos').doc(todoId)
    let updatedContent = req.body.content
    let updatedStatus = req.body.status
    let updatedTodo : any = {}
    if(updatedContent) updatedTodo.content = updatedContent
    if(updatedStatus) updatedTodo.status = updatedStatus
    await todoRef.update(updatedTodo)
    res.json("Todo updated with ID: " + todoId)
}