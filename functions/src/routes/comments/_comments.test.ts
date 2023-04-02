import createComment from "./createComment"
import deleteComment from "./deleteComment"
const { initializeApp, cert } = require('firebase-admin/app')
import testServiceAccount from '../../../privateKey.json'
import getCommentsByPost from "./getCommentsByPost"
import { Post } from "../../interfaces/posts"
import createPost from "../posts/createPost"

beforeAll(() => {
    return initializeApp({
        credential: cert(testServiceAccount)
    })
})

describe("Comments module", () => {

    const testPost: Post = {
        id: '',
        content: '__testcontent__',
        author: '__testauthor__'+Date.now(),
        created: 0
    }
    let testPostId = ""
    
    const testComment = {
        id: "",
        content: "__testcontent__",
        post: testPostId,
        author: "",
        created: 0
    }
    let testCommentId = ""

    it("Should create a post to comment on", async () => {
        const result = await createPost(testPost.author, testPost)
        testPostId = result.id
        expect(typeof result.id).toBe("string")
    })

    it("Should create a new comment", async () => {
        const result = await createComment({...testComment, post: testPostId})
        if(result.id) testCommentId = result.id
        expect(typeof result.id).toBe("string")
    })

    it("Should not create comment on non existent post", async () => {
        const result = await createComment({...testComment, post:"__non__"+Date.now()})
        expect(typeof result.message).toBe("string")
    })

    it("Should get comments", async () => {
        const result = await getCommentsByPost(testPostId, "", 0)
        expect(result.some(comment=>comment.content===testComment.content)).toBe(true)
    })

    it("Should delete the comment", async () => {
        const result = await deleteComment(testCommentId)
        expect(result).toBe(true)
    })

})