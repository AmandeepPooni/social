// import * as functions from "firebase-functions"
import { onRequest } from 'firebase-functions/v2/https'
import app from './app'


// Expose express app as a cloud function
export const api = onRequest(app)