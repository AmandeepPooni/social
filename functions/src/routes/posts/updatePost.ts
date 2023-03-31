import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { Post } from '../../interfaces/posts'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    body: Post
}

interface _Reponse extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Reponse) {
    const db = getFirestore()
    const postId = req.params.id
    let postRef = db.collection('posts').doc(postId)
    let updatedContent = req.body.content
    let updatedTodo : any = {}
    if(updatedContent) updatedTodo.content = updatedContent
    await postRef.update(updatedTodo)
    res.json("Post updated with ID: " + postId)
}