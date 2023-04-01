import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {}

interface _Response extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Response) {
    const db = getFirestore()
    const todoId = req.params.id
    let todoRef = db.collection('todos').doc(todoId)
    await todoRef.delete()
    res.json("Todo deleted with ID: " + todoId)
}