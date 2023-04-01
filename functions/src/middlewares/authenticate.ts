import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

interface _Request extends Request {
    token: string | JwtPayload
}

export default async function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(token){
        try{
            const decodedToken = verify(token, process.env.JWT_KEY as string)
            const customRequest = req as _Request
            customRequest.token = decodedToken
            next()
        }
        catch(_){
            res.status(401).send('Could not validate token. Please generate a new token at /auth/signin')
        }
    }
    else{
        res.status(401).send('Authentication token missing from request')
    }
    
}