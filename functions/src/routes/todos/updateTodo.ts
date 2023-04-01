import { Todo } from '../../interfaces/todos'
import { getFirestore } from "firebase-admin/firestore"

export default async function (todoId: string, todo: Todo) {
    const db = getFirestore()
    let todoRef = db.collection('todos').doc(todoId)
    let updatedContent = todo.content
    let updatedStatus = todo.status
    let updatedTodo : any = {}
    if(updatedContent) updatedTodo.content = updatedContent
    if(updatedStatus) updatedTodo.status = updatedStatus
    await todoRef.update(updatedTodo)
    return true
}