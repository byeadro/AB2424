// Initialize Firebase
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCiBrAivwWFQSRXtk3qMrMbrjA2rq8415w',
  authDomain: 'journal-464814.firebaseapp.com',
  projectId: 'journal-464814',
  storageBucket: 'journal-464814.firebasestorage.app',
  messagingSenderId: '851521127939',
  appId: '1:851521127939:web:2a57a4162245d5ce79b036'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
