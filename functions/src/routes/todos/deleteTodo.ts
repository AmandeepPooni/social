import { getFirestore } from "firebase-admin/firestore"
export default async function (todoId: string) {
    const db = getFirestore()
    let todoRef = db.collection('todos').doc(todoId)
    await todoRef.delete()
    return true
}