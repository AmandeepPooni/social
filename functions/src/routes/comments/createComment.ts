import { Comment } from '../../interfaces/comments'
import { getFirestore } from "firebase-admin/firestore"

export default async function (comment: Comment) {
    const db = getFirestore()
    let commentRef = db.collection('comments').doc()
    return await db.runTransaction(async t => {
        const doc = await t.get(db.collection('posts').doc(comment.post))
        if (doc.exists) {
            let newComment: Comment = {
                id: commentRef.id,
                content: comment.content,
                post: comment.post,
                author: 'abc',
                created: Date.now()
            }
            t.set(commentRef, newComment)
            return { id: commentRef.id }
        }
        else {
            return { message: "The post you are commenting on does not exist" }
        }
    })
}