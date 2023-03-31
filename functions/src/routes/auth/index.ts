import {Router} from 'express'
import signUp from './signUp'
import signIn from './signIn'

var router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

export default router