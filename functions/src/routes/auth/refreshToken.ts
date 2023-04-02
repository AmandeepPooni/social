import { timingSafeEqual, randomBytes } from 'crypto'
import { User } from '../../interfaces/auth'
import { getFirestore } from "firebase-admin/firestore"
import { sign } from 'jsonwebtoken'

export default async function (userId: string, token: string) {
    const db = getFirestore()
    const tokenDoc = await db.collection('refresh-tokens').doc(userId).get()
    const storedToken = (tokenDoc.data() as any).token

    const userDoc = await db.collection('users').doc(userId).get()
    const storedUser = userDoc.data() as User

    let response: string | any = "Failed to login"
    let status = 401
    
    if (timingSafeEqual(Buffer.from(token), Buffer.from(storedToken))) {
        const refreshToken = randomBytes(64).toString('hex')
        await db.collection('refresh-tokens').doc(userId).set({token: refreshToken})
        response = {
            token: sign({ id: storedUser.id, role: storedUser.role }, process.env.JWT_KEY as string, { expiresIn: '1h' }),
            refresh: refreshToken
        }
        status = 200
    }

    return { response, status }
}