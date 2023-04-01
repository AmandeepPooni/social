import { getFirestore } from "firebase-admin/firestore"


export default async function (commentId: string) {
    const db = getFirestore()
    let commentRef = db.collection('comments').doc(commentId)
    await commentRef.delete()
    return true
}