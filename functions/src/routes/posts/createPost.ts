import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { Post } from '../../interfaces/posts'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    body: Post
}

interface _Response extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Response) {
    const db = getFirestore()
    let postRef = db.collection('posts').doc()
    let post = req.body
    let newPost: Post = {
        id: postRef.id,
        content: post.content,
        author: 'abc',
        created: Date.now()
    }
    await postRef.set(newPost)
    res.json("Post created with ID: " + postRef.id)
}