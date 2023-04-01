import { Post } from '../../interfaces/posts'
import { getFirestore } from "firebase-admin/firestore"

export default async function (postId: string, post: Post) {
    const db = getFirestore()
    let postRef = db.collection('posts').doc(postId)
    let updatedContent = post.content
    let updatedTodo : any = {}
    if(updatedContent) updatedTodo.content = updatedContent
    await postRef.update(updatedTodo)
    return true
}