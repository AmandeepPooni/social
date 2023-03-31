import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { Comment } from '../../interfaces/comments'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    body: Comment
}

interface _Reponse extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Reponse) {
    const db = getFirestore()
    let commentRef = db.collection('comments').doc()
    let comment = req.body
    let newComment: Comment = {
        id: commentRef.id,
        content: comment.content,
        post: comment.post,
        author: 'abc',
        created: Date.now()
    }
    await commentRef.set(newComment)
    res.json("Comment created with ID: " + commentRef.id)
}