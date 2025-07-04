import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration (journal-464814)
const firebaseConfig = {
  apiKey: 'AIzaSyCiBrAivwWFQSRXtk3qMrMbrjA2rq8415w',
  authDomain: 'journal-464814.firebaseapp.com',
  projectId: 'journal-464814',
  storageBucket: 'journal-464814.firebasestorage.app',
  messagingSenderId: '851521127939',
  appId: '1:851521127939:web:2a57a4162245d5ce79b036'
}

// Initialize Firebase services
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// (Optional) Connect to emulators in development
if (import.meta.env.DEV) {
  // Auth emulator—comment out if you want to use live Auth
  // connectAuthEmulator(auth, 'https://<YOUR-CODESPACE-HOST>:9099', { disableWarnings: true })

  // Firestore emulator—comment out if you want to use live Firestore
  // connectFirestoreEmulator(db, '127.0.0.1', 8081)
}

export default app
