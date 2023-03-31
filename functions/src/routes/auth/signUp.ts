import { Request, Response } from 'express'
import { createHmac } from 'crypto'
import { Send } from 'express-serve-static-core'
import { User } from '../../interfaces/auth'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    body: User
}

interface _Reponse extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Reponse) {

    const user = req.body

    const db = getFirestore()
    const userRef = db.collection('users').doc(user.id)
    const responseText = await db.runTransaction(async t => {
        const doc = await t.get(userRef)
        if (!doc.exists) {
            const hash = createHmac('sha256', process.env.HMAC_KEY as string).update(user.password).digest('hex')
            const newUser: User = {
                id: user.id,
                password: hash
            }
            t.set(userRef, newUser)
            return "New user created"
        }
        else {
            return "User with this id already exists"
        }
    })

    res.json(responseText)
}