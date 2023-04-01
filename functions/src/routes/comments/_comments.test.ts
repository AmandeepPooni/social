import createComment from "./createComment"
import deleteComment from "./deleteComment"
const { initializeApp, cert } = require('firebase-admin/app')
import testServiceAccount from '../../../privateKey.json'
import getCommentsByPost from "./getCommentsByPost"

beforeAll(() => {
    return initializeApp({
        credential: cert(testServiceAccount)
    })
})

describe("Comment module test", () => {

    const testComment = {
        id: "",
        content: "__testcontent__",
        post: '__testpost__'+Date.now(),
        author: "",
        created: 0
    }
    
    let testCommentId = ""

    it("Should create a new comment", async () => {
        const result = await createComment(testComment)
        testCommentId = result.id
        expect(typeof result.id).toBe("string")
    })

    it("Should get comments", async () => {
        const result = await getCommentsByPost(testComment.post, "", 0)
        expect(result.some(comment=>comment.content===testComment.content)).toBe(true)
    })

    it("Should delete the comment", async () => {
        const result = await deleteComment(testCommentId)
        expect(result).toBe(true)
    })

})