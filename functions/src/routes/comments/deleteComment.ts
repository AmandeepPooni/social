import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {}

interface _Reponse extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Reponse) {
    const db = getFirestore()
    const commentId = req.params.id
    let commentRef = db.collection('comments').doc(commentId)
    await commentRef.delete()
    res.json("Comment deleted with ID: " + commentId)
}