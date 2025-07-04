import * as functions from 'firebase-functions'
import express from 'express'
import authController from './controllers/authController.js'
import journalController from './controllers/journalController.js'
const app=express(); app.use(express.json())
app.post('/signup',authController.signup)
app.post('/login',authController.login)
app.get('/entries',journalController.getEntries)
app.post('/entries',journalController.createEntry)
app.put('/entries/:id',journalController.updateEntry)
app.delete('/entries/:id',journalController.deleteEntry)
export const api=functions.https.onRequest(app)
