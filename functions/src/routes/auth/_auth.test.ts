import signUp from './signUp'
import signIn from './signIn'
const { initializeApp, cert } = require('firebase-admin/app')
import testServiceAccount from '../../../privateKey.json'

beforeAll(() => {
    process.env = { HMAC_KEY: "__TESTHMAC__", JWT_KEY: "__TESTJWT__" }
    return initializeApp({
        credential: cert(testServiceAccount)
    })
})

describe("Auth module test", () => {

    const testUser = { id: "__testuser__"+Date.now(), password: "__testpassword__"+Date.now(), role: '' }

    it("Should create a new user", async () => {
        const result = await signUp(testUser)
        expect(result).toBe("New user created")
    })

    it("Should not create a new user with same id", async () => {
        const result = await signUp(testUser)
        expect(result).toBe("User with this id already exists")
    })

    it("Should login user", async () => {
        const result = await signIn(testUser)
        expect(result.status).toBe(200)
    })

    it("Should not login user", async () => {
        const result = await signIn({...testUser, password: "__wrongpassword__"})
        expect(result.status).toBe(401)
    })

})