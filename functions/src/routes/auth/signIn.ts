import { createHmac, timingSafeEqual, randomBytes } from 'crypto'
import { User } from '../../interfaces/auth'
import { getFirestore } from "firebase-admin/firestore"
import { sign } from 'jsonwebtoken'

export default async function (user: User) {
    const hash = createHmac('sha256', process.env.HMAC_KEY as string).update(user.password).digest('hex')
    const db = getFirestore()
    const userDoc = await db.collection('users').doc(user.id).get()
    const storedUser = userDoc.data() as User
    const storedHash = storedUser.password

    let response = {
        token: "",
        refresh: "",
        message: "Login failed"
    }

    let status = 401
    if (timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash))) {
        const refreshToken = randomBytes(64).toString('hex')
        await db.collection('refresh-tokens').doc(user.id).set({token: refreshToken})
        response = {
            token: sign({ id: storedUser.id, role: storedUser.role }, process.env.JWT_KEY as string, { expiresIn: '1h' }),
            refresh: refreshToken,
            message: "Login successful"
        }
        status = 200
    }

    return { response, status }
}