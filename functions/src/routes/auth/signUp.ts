import { createHmac } from 'crypto'
import { User } from '../../interfaces/auth'
import { getFirestore } from "firebase-admin/firestore"

export default async function (user: User) {
    const db = getFirestore()
    const userRef = db.collection('users').doc(user.id)
    return await db.runTransaction(async t => {
        const doc = await t.get(userRef)
        if (!doc.exists) {
            const hash = createHmac('sha256', process.env.HMAC_KEY as string).update(user.password).digest('hex')
            const newUser: User = {
                id: user.id,
                password: hash,
                role: 'standard'
            }
            t.set(userRef, newUser)
            return "New user created"
        }
        else {
            return "User with this id already exists"
        }
    })
}