// import * as functions from "firebase-functions";
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from "firebase-admin/app";
import * as express from 'express'

// Route modules
import todos from './routes/todos'
import posts from './routes/posts'
import comments from './routes/comments'
import auth from './routes/auth'

initializeApp();

var app = express()

app.use('/auth', auth)

app.use('/todos', todos)
app.use('/posts', posts)
app.use('/comments', comments)


// Export express app as a cloud function
export const api = onRequest(app)