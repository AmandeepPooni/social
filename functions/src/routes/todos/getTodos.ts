import { Todo } from '../../interfaces/todos'
import { getFirestore } from "firebase-admin/firestore"

export default async function (authorId: string | null, after: string, limit: number) {

    const db = getFirestore()

    
    let reference: any = db.collection('todos')
    if(authorId) reference = reference.where('author', '==', authorId)

    reference = reference.orderBy('created', 'desc')


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
    snapshot.forEach((doc: any) => {
        todos.push(doc.data() as Todo)
    })

    return todos
}