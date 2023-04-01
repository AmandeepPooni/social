import { getFirestore } from "firebase-admin/firestore"

export default async function (postId: string) {
    const db = getFirestore()
    let postRef = db.collection('posts').doc(postId)
    await postRef.delete()
    return true
}