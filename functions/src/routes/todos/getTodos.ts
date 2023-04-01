import { Request, Response } from 'express'
import { Todo } from '../../interfaces/todos'
import { Send } from 'express-serve-static-core'
import { getFirestore } from "firebase-admin/firestore"


interface _Request extends Request {}

interface _Response extends Response {
    json: Send<Array<Todo>, this>
}

export default async function (req: _Request, res: _Response) {

    const db = getFirestore()

    // requires a compound index to be created in the database
    let reference = db.collection('todos').where('author', '==', 'abc').orderBy('created', 'desc')

    const after = req.query.after as string
    const limit = Number(req.query.limit)

    // implements query cursor based on id of last received todo
    if(after){
        const startAfterSnapshot = await db.collection('todos').doc(after).get()
        reference = reference.startAfter(startAfterSnapshot)
    }

    // implements limit on resultset
    if(limit){
        reference = reference.limit(limit)
    }
    
    let todos: Array<Todo> = []

    const snapshot = await reference.get()
    snapshot.forEach(doc => {
        todos.push(doc.data() as Todo)
    })

    res.json(todos)

}