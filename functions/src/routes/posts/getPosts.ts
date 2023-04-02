import { Post } from '../../interfaces/posts'
import { getFirestore } from "firebase-admin/firestore"

export default async function (authorId: string | null, after: string, limit: number) {

    const db = getFirestore()

    let reference: any = db.collection('posts')
    if(authorId) reference = reference.where('author', '==', authorId)

    reference = reference.orderBy('created', 'desc')

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
    snapshot.forEach((doc: any) => {
        posts.push(doc.data() as Post)
    })

    return posts

}