import { Post } from '../../interfaces/posts'
import { getFirestore } from "firebase-admin/firestore"

export default async function (author: string, after: string, limit: number) {

    const db = getFirestore()

    // requires a compound index to be created in the database
    let reference = db.collection('posts').where('author', '==', author).orderBy('created', 'desc')

    // implements query cursor based on id of last received post
    if(after){
        const startAfterSnapshot = await db.collection('posts').doc(after).get()
        reference = reference.startAfter(startAfterSnapshot)
    }

    // implements limit on resultset
    if(limit){
        reference = reference.limit(limit)
    }
    
    let posts: Array<Post> = []

    const snapshot = await reference.get()
    snapshot.forEach(doc => {
        posts.push(doc.data() as Post)
    })

    return posts

}