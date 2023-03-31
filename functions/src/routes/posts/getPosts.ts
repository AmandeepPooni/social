import { Request, Response } from 'express'
import { Post } from '../../interfaces/posts'
import { Send } from 'express-serve-static-core'
import { getFirestore } from "firebase-admin/firestore"


interface _Request extends Request {}

interface _Reponse extends Response {
    json: Send<Array<Post>, this>
}

export default async function (req: _Request, res: _Reponse) {

    const db = getFirestore()

    // requires a compound index to be created in the database
    let reference = db.collection('posts').where('author', '==', 'abc').orderBy('created', 'desc')

    const after = req.query.after as string
    const limit = Number(req.query.limit)

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

    res.json(posts)

}