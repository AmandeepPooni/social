import { Todo } from '../../interfaces/todos'
import { getFirestore } from "firebase-admin/firestore"
export default async function (author: string, todo: Todo) {
    const db = getFirestore()
    let todoRef = db.collection('todos').doc()
    let newTodo: Todo = {
        id: todoRef.id,
        content: todo.content,
        status: todo.status,
        author: author,
        created: Date.now()
    }
    await todoRef.set(newTodo)
    return { id: todoRef.id }
}