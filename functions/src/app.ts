import express from 'express'
import { initializeApp } from "firebase-admin/app"

// Route modules
import todos from './routes/todos'
import posts from './routes/posts'
import comments from './routes/comments'
import auth from './routes/auth'

//authentication middleware
import authenticate from './middlewares/authenticate'

initializeApp()

var app = express()

app.use('/auth', auth)

app.use('/todos', authenticate, todos)
app.use('/posts', authenticate, posts)
app.use('/comments', authenticate, comments)

export default app