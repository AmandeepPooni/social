const { initializeApp, cert } = require('firebase-admin/app')
import testServiceAccount from '../../../privateKey.json'
import { Post } from '../../interfaces/posts'
import createPost from './createPost'
import deletePost from './deletePost'
import getPosts from './getPosts'
import updatePost from './updatePost'

beforeAll(() => {
    return initializeApp({
        credential: cert(testServiceAccount)
    })
})

describe("Posts module", () => {

    const testPost: Post = {
        id: '',
        content: '__testcontent__',
        author: '__testauthor__'+Date.now(),
        created: 0
    }

    let testPostId = ""

    it("Should create a new post", async () => {
        const result = await createPost(testPost.author, testPost)
        testPostId = result.id
        expect(typeof result.id).toBe("string")
    })

    it("Should get posts", async () => {
        const result = await getPosts(testPost.author, "", 0)
        expect(result.some(post=>post.content===testPost.content)).toBe(true)
    })

    it("Should update the post", async () => {
        const result = await updatePost(testPostId, testPost)
        expect(result).toBe(true)
    })

    it("Should delete the post", async () => {
        const result = await deletePost(testPostId)
        expect(result).toBe(true)
    })

})