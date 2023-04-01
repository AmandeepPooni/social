// import * as functions from "firebase-functions";
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from "firebase-admin/app";
import * as express from 'express'

// Route modules
import todos from './routes/todos'
import posts from './routes/posts'
import comments from './routes/comments'
import auth from './routes/auth'

//authentication middleware
import authenticate from './middlewares/authenticate';


initializeApp();

var app = express()

app.use('/auth', auth)

app.use('/todos', authenticate, todos)
app.use('/posts', authenticate, posts)
app.use('/comments', authenticate, comments)


// Expose express app as a cloud function
export const api = onRequest(app)