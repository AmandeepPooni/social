import { Request, Response, NextFunction } from 'express'
import { getFirestore } from "firebase-admin/firestore"

interface _Request extends Request {
    [x: string]: any
}

export default function (resource: string) {

    return async function (req: _Request, res: Response, next: NextFunction) {
        const token = req.token
        const recourceId = req.params.id
        if (recourceId) {
            if (token.role == "admin") {
                next()
            }
            else {
                const db = getFirestore()
                const recourceDoc = await db.collection(resource).doc(recourceId).get()
                const recourceData: any = recourceDoc.data()
                if (recourceData.author === token.id) {
                    next()
                }
                else {
                    res.status(403).send('You are not authorised to perform this action')
                }
            }
        }
        else {
            next()
        }
    }

}