import { Post } from '../../interfaces/posts'
import { getFirestore } from "firebase-admin/firestore"

export default async function (author: string, post: Post) {
    const db = getFirestore()
    let postRef = db.collection('posts').doc()
    let newPost: Post = {
        id: postRef.id,
        content: post.content,
        author: author,
        created: Date.now()
    }
    await postRef.set(newPost)
    return {id: postRef.id}
}