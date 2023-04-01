import { Comment } from '../../interfaces/comments'
import { getFirestore } from "firebase-admin/firestore"

export default async function (comment: Comment) {
    const db = getFirestore()
    let commentRef = db.collection('comments').doc()
    let newComment: Comment = {
        id: commentRef.id,
        content: comment.content,
        post: comment.post,
        author: 'abc',
        created: Date.now()
    }
    await commentRef.set(newComment)
    return { id: commentRef.id }
}