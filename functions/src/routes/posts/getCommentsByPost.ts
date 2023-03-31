import { Request, Response } from 'express'
import { Comment } from '../../interfaces/comments'
import { Send } from 'express-serve-static-core'
import { getFirestore } from "firebase-admin/firestore"


interface _Request extends Request {}

interface _Reponse extends Response {
    json: Send<Array<Comment>, this>
}

export default async function (req: _Request, res: _Reponse) {

    const db = getFirestore()

    const postId = req.params.id

    // requires a compound index to be created in the database
    let reference = db.collection('comments').where('post', '==', postId).orderBy('created', 'desc')

    const after = req.query.after as string
    const limit = Number(req.query.limit)

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

    res.json(comments)

}