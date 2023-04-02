import {Router} from 'express'
import signUp from './signUp'
import signIn from './signIn'
import refreshToken from './refreshToken'

var router = Router()

router.post('/signup', async (req , res) => {
    res.json(await signUp(req.body))
})

router.post('/signin', async (req , res) => {
    const result = await signIn(req.body)
    res.status(result.status).json(result.response)
})

router.post('/token', async (req , res) => {
    const result = await refreshToken(req.body.id, req.body.refresh)
    res.status(result.status).json(result.response)
})

export default router