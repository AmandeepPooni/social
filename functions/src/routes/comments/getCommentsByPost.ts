import { Comment } from '../../interfaces/comments'
import { getFirestore } from "firebase-admin/firestore"

export default async function (postId: string, after: string, limit: number) {

    const db = getFirestore()

    // requires a compound index to be created in the database
    let reference = db.collection('comments').where('post', '==', postId).orderBy('created', 'desc')

    // implements query cursor based on id of last received comment
    if(after){
        const startAfterSnapshot = await db.collection('comments').doc(after).get()
        reference = reference.startAfter(startAfterSnapshot)
    }

    // implements limit on resultset
    if(limit){
        reference = reference.limit(limit)
    }
    
    let comments: Array<Comment> = []

    const snapshot = await reference.get()
    snapshot.forEach(doc => {
        comments.push(doc.data() as Comment)
    })

    return comments

}