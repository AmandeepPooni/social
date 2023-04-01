import { Request, Response } from 'express'
import { createHmac, timingSafeEqual } from 'crypto'
import { Send } from 'express-serve-static-core'
import { User } from '../../interfaces/auth'
import { getFirestore } from "firebase-admin/firestore"
import { sign } from 'jsonwebtoken'

interface _Request extends Request {
    body: User
}

interface _Response extends Response {
    json: Send<string, this>
}

export default async function (req: _Request, res: _Response) {
    let user = req.body
    const hash = createHmac('sha256', process.env.HMAC_KEY as string).update(user.password).digest('hex')
    const db = getFirestore()
    const userDoc = await db.collection('users').doc(user.id).get()
    const storedUser = userDoc.data() as User
    const storedHash = storedUser.password

    let response = "Failed to login"
    let status = 401
    if (timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash))) {
        response = sign({ id: storedUser.id, role: storedUser.role }, process.env.JWT_KEY as string, { expiresIn: '1h' })
        status = 200
    }

    res.status(status).json(response)
}