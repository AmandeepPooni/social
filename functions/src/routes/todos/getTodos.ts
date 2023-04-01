import { Todo } from '../../interfaces/todos'
import { getFirestore } from "firebase-admin/firestore"

export default async function (author: string, after: string, limit: number) {

    const db = getFirestore()

    // requires a compound index to be created in the database
    let reference = db.collection('todos').where('author', '==', author).orderBy('created', 'desc')

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

    return todos
}