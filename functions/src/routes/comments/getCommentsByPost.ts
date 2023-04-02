import { Comment } from '../../interfaces/comments'
import { getFirestore } from "firebase-admin/firestore"

export default async function (postId: string | null, after: string, limit: number) {

    const db = getFirestore()

    // requires a compound index to be created in the database
    let reference: any = db.collection('comments')
    if(postId) reference = reference.where('post', '==', postId)

    reference = reference.orderBy('created', 'desc')
    
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
    snapshot.forEach((doc: any) => {
        comments.push(doc.data() as Comment)
    })

    return comments

}