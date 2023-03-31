import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {}

interface _Reponse extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Reponse) {
    const db = getFirestore()
    const postId = req.params.id
    let postRef = db.collection('posts').doc(postId)
    await postRef.delete()
    res.json("Post deleted with ID: " + postId)
}